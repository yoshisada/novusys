import styles from './ChainLaunch.module.scss'
import { useConfig } from '@/api/config'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useAAInterface } from '@/api/aaInterface'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ethers } from 'ethers'
import { configureChains, useAccount, useConnect, useDisconnect, usePrepareSendTransaction, useProvider, useSendTransaction, useSwitchNetwork, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'ethers/lib/utils.js'
// import { InjectedConnector } from 'wagmi/dist/connectors/injected'
import { InjectedConnector } from 'wagmi/connectors/injected'
import FundAddress from '@/components/wagmi-functions/FundAddress/FundAddress'
import { P } from '@wagmi/core/dist/index-35b6525c'
import { useState } from 'react'
interface ChainLaunchProps {
  cid: number
  custodial: string
}

const ChainLaunch: React.FC<ChainLaunchProps> = ({ cid, custodial }) => {
  const { chains } = useConfig()
  const { sendTxn, getOp, checkAddress } = useAAInterface()
  const { user, error } = useUser();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const provider = useProvider();
  const [usrAddress, setUsrAddress] = useState("")
  const [status, setStatus] = useState(chains[cid].pm ? 'launching' : 'prefund')
  const [prefunded, setPrefunded] = useState(false)
  const [transaction, setTransaction] = useState("")

  const [alreadyDeployed, setAlreadyDeployed] = useState("0x")


  //@ts-ignore
  const op = () => getOp(user?.sub, "0x6d06Eb861809551087F5b37272f36ceF459C5338",
    ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (op: any) => {
      setUsrAddress(op.sender)
      console.log(op.sender)
      if (usrAddress != ""){
        checkAddress(usrAddress, provider, (v: string) => { setAlreadyDeployed(v) })
      }
      
    })
  const txn = () => {
    //@ts-ignore
    sendTxn(user?.sub, "0x6d06Eb861809551087F5b37272f36ceF459C5338",
      ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (tx: string) => {
        if (tx != null) {
          console.log(tx)
          setTransaction(tx)
          setStatus('launching')
        }
      })
  }

  op()

  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <img src={chains[cid].logo} className={styles['chain__logo']} />
        {chains[cid].chain}
      </div>
      <div className={styles['middle__container']}>
        {
          chains[cid].pm ? <>Loading... </> :
            <>{usrAddress}</>
        }
      </div>
      {
        alreadyDeployed == "0x" ?

          <div className={styles['right__container']}>
            <BlurPaper>
              {
                status == 'launch contract' ? <div className={styles['status__blurb']} onClick={custodial == "cust" ? () => { txn() } : () => { }}>
                  Launch Contract
                </div> :
                  <></>
              }
              {status == "launching" ?
                <div className={styles['status__blurb']} onClick={() => window.open(chains[cid].explorer + "tx/" + transaction, "_blank")}>
                  {transaction.slice(0, 5) + "..." + transaction.slice(50,)}
                </div> :
                <></>
              }
              {
                status == "prefund" ?

                  isConnected ?
                    <div className={styles['status__blurb']} onClick={() => {

                    }}>
                      {
                        usrAddress == "" ? <>Loading... </> :
                          <FundAddress cid={cid} value={chains[cid].launchPrice} address={usrAddress} setConfirm={() => { setStatus("launch contract") }} />
                      }

                      {/* Prefund Address */}
                    </div> :
                    <div className={styles['status__blurb']} onClick={() => connect()}>
                      Connect Wallet
                    </div>

                  : <></>
              }

            </BlurPaper>
          </div >
          :

          <div className={styles['right__container']}>
            <BlurPaper>
              <div className={styles['status__blurb']}>
                Already Deployed!
              </div>


            </BlurPaper>
          </div>
      }

    </div >
  )
}

export default ChainLaunch
