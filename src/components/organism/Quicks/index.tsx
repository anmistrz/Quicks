'use client'

import {useState} from 'react'
import Image from 'next/image'
import icons from '@/assets/icons'
import ModalTask from '@/components/molecules/ModalTask'
import ModalInbox from '@/components/molecules/ModalInbox'

export default function Quicks() {
    const [isQuicksOpen, setIsQuicksOpen] = useState(false)
    const [isOpenInbox, setIsOpenInbox] = useState(false)
    const [isOpenTasks, setIsOpenTasks] = useState(false)
    const [isOpenModalTask, setIsOpenModalTask] = useState(false)
    const [isOpenModalInbox, setIsOpenModalInbox] = useState(false)
    // const [defaultDataInbox, setDefaultInobx] = useState(dummyDataChats)
    const [dataInbox, setDataInbox] = useState([])


  return (
    <div>
        <div 
            className={`absolute bottom-10 right-10 flex flex-row gap-4 items-end text-center z-10`}
        >
            <div className='flex flex-col gap-4'>
                <button onClick={() => setIsQuicksOpen(!isQuicksOpen)} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
                    <Image src={icons.BUTTON_QUICKS} alt="logo" width={68} height={68} />
                </button>
            </div>
        </div>


        {/* Item Menu Quicks */}
        <div 
            className={`absolute bottom-10 flex flex-col gap-2 items-center text-center 
            ${isQuicksOpen ? 'transition-all visible right-[120px] duration-500' : 'transition-all right-10 duration-500 invisible'}
            `}
        >
                <span className='text-white'>Inbox</span>
                <button 
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={() => {
                        setIsOpenInbox(!isOpenInbox)
                        setIsQuicksOpen(!isQuicksOpen)
                        setIsOpenModalTask(false)
                        setTimeout(() => {
                            setIsOpenModalInbox(true)
                        }, 500)
              
                    }}
                >
                        <Image src={icons.INBOX_WHITE} alt="logo" width={60} height={60} />
                </button>
        </div>
        <div 
           className={`absolute bottom-10 flex flex-col gap-2 items-center text-center 
           ${isQuicksOpen ? 'transition-all visible right-[200px] duration-500' : 'transition-all right-10 duration-500 invisible'}
           `}
        >
                <span className='text-white'>Tasks</span>
                <button 
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={() => {
                        setIsOpenTasks(!isOpenTasks)
                        setIsQuicksOpen(!isQuicksOpen)
                        setIsOpenModalInbox(false)
                        setTimeout(() => {
                            setIsOpenModalTask(true)
                        }, 500)
                    }}
                >
                    <Image src={icons.TASK_WHITE} alt="logo" width={60} height={60} />
                </button>
        </div>
        {/* End Item Menu Quicks */}
        


        {isQuicksOpen === false && isOpenTasks === true && (
            <>
                <div 
                    className={`absolute bottom-10 right-10 flex flex-row gap-4 items-end text-center z-10`}
                >
                        <button onClick={() => { 
                            setIsOpenTasks(!isOpenTasks)
                            setIsOpenModalTask(false)
                            }} 
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 "
                        >
                            <div className='bg-[#4F4F4F] rounded-full h-16 w-16 px-2 mb-1  text-white'>
                                <div className='bg-[#F8B76B] rounded-full h-16 w-16 text-white flex justify-center items-center'>
                                    <Image src={icons.TASK_OPEN} alt="logo" width={27} height={27} />
                                </div>
                            </div>
                        </button>
                </div>
                <div 
                    className={`absolute bottom-10 flex flex-col gap-2 items-center text-center transition-all visible right-[120px] duration-500`}
                >
                        {/* <span className='text-white'>Inbox</span> */}
                        <button 
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            onClick={() => {
                                setIsOpenTasks(false)
                                setIsQuicksOpen(false)
                                setIsOpenInbox(true)
                                setIsOpenModalTask(false)
                                setTimeout(() => {
                                    setIsOpenModalInbox(true)
                                }, 500)
                            }}
                        >
                                <Image src={icons.INBOX_WHITE} alt="logo" width={60} height={60} />
                        </button>
                </div>
            
            </>
        )}

        {isQuicksOpen === false && isOpenInbox === true && (
            <>
                <div 
                    className={`absolute bottom-10 right-10 flex flex-row gap-4 items-end text-center z-10`}
                >
                        <button onClick={() => {
                            setIsOpenInbox(!isOpenInbox)
                            setIsOpenModalInbox(false)
                            }} 
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 "
                        >
                            <div className='bg-[#4F4F4F] rounded-full h-16 w-16 px-2 mb-1  text-white'>
                                <div className='bg-[#8785FF] rounded-full h-16 w-16 text-white flex justify-center items-center'>
                                    <Image src={icons.INBOX_OPEN} alt="logo" width={27} height={27} />
                                </div>
                            </div>
                        </button>
                </div>
                <div 
                    className={`absolute bottom-10 flex flex-col gap-2 items-center text-center transition-all visible right-[120px] duration-500`}
                >
                        {/* <span className='text-white'>Task</span> */}
                        <button 
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            onClick={() => {
                                setIsOpenInbox(false)
                                setIsQuicksOpen(false)
                                setIsOpenTasks(true)
                                setIsOpenModalInbox(false)
                                setTimeout(() => {
                                    setIsOpenModalTask(true)
                                }, 500)
                            }}
                        >
                                <Image src={icons.TASK_WHITE} alt="logo" width={60} height={60} />
                        </button>
                </div>
            
            </>
        )}

        {isOpenModalTask && isOpenModalInbox === false && (
            <ModalTask isOpenModalTask={isOpenModalTask} />
        )}

        {isOpenModalInbox && isOpenModalTask === false && (
            <ModalInbox 
                isOpenModalInbox={isOpenModalInbox} 
                setIsOpenModalInbox={setIsOpenModalInbox} 
                setDataInbox={setDataInbox} 
                setIsOpenInbox={setIsOpenInbox}
                dataInbox={dataInbox} 
            />
        )}

        {/* <ModalTask /> */}


    </div>
  )
}
