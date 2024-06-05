import {useState, useEffect, useRef ,Fragment} from 'react'
import Image from 'next/image'
import icons from '@/assets/icons'


interface IDataReply {
    id: number,
    name: string,
    message: string
}

export default function DetailInbox(
    {dataInbox, detailInbox ,setDetailInbox, setIsDetailInbox, setIsOpenModalInbox, setIsOpenInbox} 
        : 
    {
        readonly dataInbox: any[], 
        readonly setDataInbox: any,
        readonly detailInbox: any[],
        readonly setDetailInbox: React.Dispatch<React.SetStateAction<any[]>>,
        readonly setIsDetailInbox: React.Dispatch<React.SetStateAction<boolean>>
        readonly setIsOpenModalInbox: React.Dispatch<React.SetStateAction<boolean>>
        readonly setIsOpenInbox: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    // const [detailInbox, setDetailInbox] = useState<any[]>([])
    const [message, setMessage] = useState<string>('')
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [indexEdit, setIndexEdit] = useState<number>(1)
    const [isEditMessage, setIsEditMessage] = useState<boolean>(false)
    const [isReply, setIsReply] = useState<boolean>(false)
    const [dataReply, setDataReply] = useState<IDataReply>({
        id: 0,
        name: "",
        message: ""
    })

    const [isSetReplyToData, setIsSetReplyToData] = useState<boolean>(false)
    const [isNewMessage, setIsNewMesage] = useState<boolean>(false)
    const lastTaskRef = useRef<HTMLDivElement>(null)


    const handleLastRef = () => {
        lastTaskRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsNewMesage(false)
    }


    const handleSubmit = (e:any) => {
        e.preventDefault()

        if(isEditMessage) {

            setDetailInbox((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        chats: item.chats.map((chat:any, index:number) => {
                            if(chat.id === indexEdit) {
                                return {
                                    ...chat,
                                    message: message
                                }
                            }
                            return chat
                        })
                    }
                })
            })

            dataInbox.map((item, index) => {
                if(item.idGroup === detailInbox[0].idGroup) {
                    item.chats = item.chats.map((chat:any, idx:number) => {
                        if(chat.id === indexEdit) {
                            return {
                                ...chat,
                                message: message
                            }
                        }
                        return chat
                    })
                }
            })
            setIsEditMessage(false)
            setIndexEdit(0)
            setMessage('')

        } else if (isReply) {
            setIsSetReplyToData(true)
            setDetailInbox((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        chats: [
                            ...item.chats,
                            {
                                id: item.chats.length + 1,
                                idUser: item.member.length && item.member[item.member.length - 1].name === "You" ? item.member.length : item.member.length + 1,
                                message: message,
                                reply: dataReply.message,
                                name: 'You',
                                date: new Date()
                            }
                        ]
                    }
                })
            })

            setTimeout(() =>{
                setIsSetReplyToData(false)
            },1000)

            setIsReply(false)
        
        } else {
            setIsNewMesage(true)
            setIsSubmit(true)
            setDetailInbox((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        chats: [
                            ...item.chats,
                            {
                                id: item.chats.length + 1,
                                idUser: item.member.length && item.member[item.member.length - 1].name === "You" ? item.member.length : item.member.length + 1,
                                message: message,
                                name: 'You',
                                date: new Date()
                            }
                        ]
                    }
                })
            })
    
            setTimeout(() => {
                setIsSubmit(false)
                setMessage('')
            },1000)
        }
    }

    const handleOptionsChats = (index:any) => {
        let elements = document.querySelectorAll(".data-menu");
        const dataElements = Array.from(elements);

        // console.log("e.target", e.target)

        dataElements.forEach((element, elIndex) => {
            let main = dataElements[elIndex];
 
            let dataOption = main.id;
            

            if(dataOption === index.toString()) {
                main?.classList.toggle("hidden");
            }
        });
    }

    const handleEditSelectionChat = (e:any, index:number) => {
        setIsEditMessage(true)
        const getEditChats = detailInbox[0].chats.filter((item:any, idx:number) => idx === index)
        setMessage(getEditChats[0].message)
        setIndexEdit(getEditChats[0].id)
        handleOptionsChats(index)
    }

    const handleDeleteChat = (index:number) => {
        setDetailInbox((prev) => {
            return prev.map((item) => {
                return {
                    ...item,
                    chats: item.chats.filter((chat:any) => chat.id !== index)
                }
            })
        })

        dataInbox.map((item, idx) => {
            if(item.idGroup === detailInbox[0].idGroup) {
                item.chats = item.chats.filter((chat:any) => chat.id !== index)
            }
        })

        handleOptionsChats(index)
    }

    const handleReply = (idUser:number, index:number) => {
        const getDataReply = detailInbox[0].chats.filter((item:any) => item.id === idUser)
        setDataReply({
            id: getDataReply[0].id,
            name: getDataReply[0].name,
            message: getDataReply[0].message
        })
        setIsReply(true)
        handleOptionsChats(index)
    }

    const getRandomNumber = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    useEffect(() => {

        if(message !== "" && isSubmit) {
            dataInbox.map((item, index) => {

                if(item.idGroup === detailInbox[0].idGroup) {
                    item.chats = [
                        ...item.chats,
                        {
                            id: item.chats.length + 1,
                            idUser: item.member.length && item.member[item.member.length - 1].name === "You" ? item.member.length : item.member.length + 1,
                            message: message,
                            name: 'You',
                            date: new Date()
                        }
                    ]
                }
            })
        }

    }, [isSubmit])

    useEffect(() => {
        if(isSetReplyToData) {
            dataInbox.map((item, index) => {
                if(item.idGroup === detailInbox[0].idGroup) {
                    item.chats = [
                        ...item.chats,
                        {
                            id: item.chats.length + 1,
                            idUser: item.member.length && item.member[item.member.length - 1].name === "You" ? item.member.length : item.member.length + 1,
                            message: message,
                            reply: dataReply.message,
                            name: 'You',
                            date: new Date()
                        }
                    ]
                }
            })
        }
    }, [isSetReplyToData])

  return (
        <div className="flex flex-col space-y-4 text-md text-[#4f4f4f]">
            <div className="flex w-full items-center gap-4 border-b-2 border-[#828282] pb-4 py-[24px] px-[32px]">
                <div className="flex w-1/8 items-center space-x-2">
                    <button onClick={() => setIsDetailInbox(false)} className="w-full h-full">
                        <Image src={icons.ARROW_BACK} alt="icon-back" width={38} height={38} />
                    </button>
                    {/* <h1 className="text-xl font-bold">Back</h1> */}
                </div>
                <div className="flex flex-col w-full items-center  w-full justify-start">
                    <p className="text-lg font-bold w-full text-[#2F80ED]">{detailInbox[0].title}</p>
                    <p className="text-sm text-[#4F4F4F] w-full">{detailInbox[0].member.length} Participants </p>
                </div>
                <div className="flex w-1/4 items-center space-x-2 justify-end">
                    <button onClick={() => {
                            setIsOpenModalInbox(false)
                            setIsOpenInbox(false)
                        }} 
                        className="w-1/2 h-full flex justify-end"
                    >
                            <Image src={icons.CLOSE} alt="icon-delete" width={18} height={18} />
                    </button>
                    {/* <h1 className="text-xl font-bold">Delete</h1> */}
                </div>
            </div>
            <div className="flex flex-col space-y-4 pb-[24px] px-[32px]">
                {detailInbox.map((item, indexComponent) => (
                    <div key={indexComponent} className="flex flex-col h-[350px] overflow-y-auto">


                        {item.chats.map((chat:any, index:number) => (
                            <Fragment key={index}>
                                <div ref={index === item.chats.length - 1 ? lastTaskRef : null}>
                                    {
                                    new Date(item.chats[index].date || chat.date).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) 
                                        !== 
                                    new Date(item.chats[index - 1]?.date || chat.date).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) 
                                    ||
                                    new Date(item.chats[index].date || chat.date).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) 
                                        !==
                                    new Date(item.chats[index + 1]?.date || chat.date).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) 
                                    ? (
                                        <div className='mb-2'>
                                            <div className="flex flex-row items-center justify-center text-center">
                                                <hr className="w-full border-[#828282]" />
                                                <p className="text-sm font-semibold w-[550px] text-gray-400">{new Date(chat.date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                                                <hr className="w-full border-[#828282]" />
                                            </div>

                                            <div key={index} className="flex flex-col mb-4 h-[100px]">
                                                <p className={`text-sm text-gray-400 font-semibold ${chat.idUser === item.member.length ? 'text-right pr-2' : 'text-left'} ${chat.idUser === 1 ? 'text-[#E5A443]' : chat.idUser === 2 ? 'text-[#7C8083]' :  chat.idUser === 3 ? 'text-[#43B78D]' : chat.idUser === 4 ? 'text-[#E9F3FF]' : 'text-[#9B51E0]'}`}>
                                                    {chat.name}
                                                </p>

                                                <div className={`flex flex-row space-x-2 ${chat.idUser === item.member.length ? 'justify-end' : 'justify-start'}`}>


                                                    {/* BODY */}
                                                    <div className="flex flex-col w-3/4 gap-2">
                                                        {chat?.reply && (
                                                            <div className={`flex flex-col w-full mb-2 bg-[#F2F2F2] p-2 gap-2 rounded-lg`}>
                                                                <p className="text-sm text-[#4F4F4F]">{chat.reply}</p>
                                                            </div>
                                                        )}

                                                        <div className='flex flex-row gap-2'>

                                                            {/* OPTION BUTTON RIGHT */}
                                                            {chat.idUser === item.member.length && (
                                                                <button id={`${index}`} className='w-8 h-5 pl-4' onClick={(e) => handleOptionsChats(index)}>
                                                                    <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                                                                            fill="#828282"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                
                                                            )}
                                                            {/* END OPTION BUTTON RIGHT */}
                                                            <div className={`flex flex-col w-full  p-2 gap-2 rounded-lg ${chat.idUser === 1 ? 'bg-[#FCEED3]' : chat.idUser === 2 ? 'bg-[#E9F3FF]' :  chat.idUser === 3 ? 'bg-[#D2F2EA]' : chat.idUser === 4 ? 'bg-[#E9F3FF]' : 'bg-[#EEDCFF]'}`}>
                                                                <p className="text-sm text-[#4F4F4F]">{chat.message}</p>
                                                                {/* 08.00 */}
                                                                <p className="text-sm text-gray-400">
                                                                    {new Date(chat.date).toLocaleDateString('id-ID', {hour: '2-digit', minute:'2-digit'}).split(' ')[1]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </ div>
                                                    {/* END BODY */}

                                                    {/* OPTION BUTTON LEFT */}
                                                    {chat.idUser !== item.member.length && (
                                                        <button id={`${index}`} className='w-8 h-5' onClick={(e) => handleOptionsChats(index)}>
                                                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                                                                    fill="#828282"
                                                                />
                                                            </svg>
                                                        </button>
                                                        
                                                    )}
                                                    {/* END OPTION BUTTON LEFT */}
                                                </div>


                                                {/* Tooltip option right */}
                                                {chat.idUser === item.member.length && (
                                                    <div id={`${index}`} className='hidden relative bottom-[40px] left-32 w-32 h-18  bg-white border-2 border-[#828282] rounded-lg  data-menu'>
                                                        <div className='flex flex-col justify-start items-start'>
                                                            <button onClick={(e) => handleEditSelectionChat(e, index)}
                                                                className='text-sm py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-b-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Edit
                                                            </button>
                                                            <button onClick={(e) => handleDeleteChat(chat.id)}
                                                                className='text-sm py-2 text-[#EB5757] font-semibold w-full py-1 pl-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* End Tooltip option right */}

                                                {/* Tooltip option left */}
                                                {chat.idUser !== item.member.length && (
                                                    <div id={`${index}`} className='hidden relative bottom-[40px] left-80 w-32 h-18  bg-white border-2 border-[#828282] rounded-lg  data-menu'>
                                                        <div className='flex flex-col justify-start items-start text-[#828282] '>
                                                            <button
                                                                className='text-sm  py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-b-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Share
                                                            </button>
                                                            <button onClick={() => handleReply(chat.id, index)}
                                                                className='text-sm  py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* End Tooltip option left */}

                                                </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="flex flex-col mb-4 h-[110px]">
                                                <p className={`text-sm text-gray-400 font-semibold mt-12 ${chat.idUser === item.member.length ? 'text-right pr-2' : 'text-left'} ${chat.idUser === 1 ? 'text-[#E5A443]' : chat.idUser === 2 ? 'text-[#7C8083]' :  chat.idUser === 3 ? 'text-[#43B78D]' : chat.idUser === 4 ? 'text-[#E9F3FF]' : 'text-[#9B51E0]'}`}>
                                                    {chat.name}
                                                </p>

                                                <div className={`flex flex-row space-x-2 ${chat.idUser === item.member.length ? 'justify-end' : 'justify-start'}`}>

                                                    {/* BODY */}
                                                    <div className="flex flex-col w-3/4 gap-2">
                                                        {chat?.reply && (
                                                            <div className={`flex flex-col w-full  bg-[#F2F2F2] p-2 gap-2 rounded-lg`}>
                                                                <p className="text-sm text-[#4F4F4F]">{chat.reply}</p>
                                                            </div>
                                                        )}

                                                        <div className='flex flex-row gap-2'>

                                                            {/* OPTION BUTTON RIGHT */}
                                                            {chat.idUser === item.member.length && (
                                                                <button id={`${index}`} className='w-8 h-5 pl-4' onClick={(e) => handleOptionsChats(index)}>
                                                                    <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                                                                            fill="#828282"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                
                                                            )}
                                                            {/* END OPTION BUTTON RIGHT */}
                                                            <div className={`flex flex-col w-full  p-2 gap-2 rounded-lg ${chat.idUser === 1 ? 'bg-[#FCEED3]' : chat.idUser === 2 ? 'bg-[#E9F3FF]' :  chat.idUser === 3 ? 'bg-[#D2F2EA]' : chat.idUser === 4 ? 'bg-[#E9F3FF]' : 'bg-[#EEDCFF]'}`}>
                                                                <p className="text-sm text-[#4F4F4F]">{chat.message}</p>
                                                                {/* 08.00 */}
                                                                <p className="text-sm text-gray-400">
                                                                    {new Date(chat.date).toLocaleDateString('id-ID', {hour: '2-digit', minute:'2-digit'}).split(' ')[1]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </ div>
                                                    {/* END BODY */}

                                                    {/* OPTION BUTTON LEFT */}
                                                    {chat.idUser !== item.member.length && (
                                                        <button id={`${index}`} className='w-8 h-5' onClick={(e) => handleOptionsChats(index)}>
                                                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                                                                    fill="#828282"
                                                                />
                                                            </svg>
                                                        </button>
                                                        
                                                    )}
                                                    {/* END OPTION BUTTON LEFT */}
                                                </div>


                                                {/* Tooltip option right */}
                                                {chat.idUser === item.member.length && (
                                                    <div id={`${index}`} className='hidden relative bottom-[40px] left-32 w-32 h-18  bg-white border-2 border-[#828282] rounded-lg  data-menu'>
                                                        <div className='flex flex-col justify-start items-start'>
                                                            <button onClick={(e) => handleEditSelectionChat(e, index)}
                                                                className='text-sm py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-b-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Edit
                                                            </button>
                                                            <button onClick={(e) => handleDeleteChat(chat.id)}
                                                                className='text-sm py-2 text-[#EB5757] font-semibold w-full py-1 pl-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* End Tooltip option right */}

                                                {/* Tooltip option left */}
                                                {chat.idUser !== item.member.length && (
                                                    <div id={`${index}`} className='hidden relative bottom-[40px] left-80 w-32 h-18  bg-white border-2 border-[#828282] rounded-lg  data-menu'>
                                                        <div className='flex flex-col justify-start items-start text-[#828282] '>
                                                            <button
                                                                className='text-sm  py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-b-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Share
                                                            </button>
                                                            <button onClick={() => handleReply(chat.id, index)}
                                                                className='text-sm  py-2 text-[#2F80ED] w-full font-semibold py-1 pl-2 border-[#828282] font-weight-400 flex flex row justify-start'>
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* End Tooltip option left */}

                                        </div>
                                    )}
                                </div>
                                
                            </Fragment>
                        ))}
                    </div>
                ))}

                <div className='w-full h-12 flex gap-2 justify-between items-center'>
                    <form className='flex gap-2 w-full' onSubmit={(e) => handleSubmit(e)}>
                        <div className= 'flex flex-col w-full'>
                            {isNewMessage && (
                                <div className='absolute bottom-24 rounded-lg left-60 w-[100px] h-[40px] flex items-center justify-center bg-[#E9F3FF] text-center'>
                                    <button 
                                        onClick={handleLastRef}
                                        className="text-[#2F80ED] font-semibold text-sm"
                                    >
                                        New Message
                                    </button>
                                </div>
                            )}
                            {dataReply && isReply && (
                                <div className="absolute bottom-20 w-[510px] h-[100px] bg-[#F2F2F2] text-sm p-2 border-2 border-[#828282] rounded-t-lg">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="text-[#4f4f4f] font semibold pl-2">Replying to {dataReply.name}</p>
                                        <button className="w-8 h-8" onClick={() => setIsReply(false)}>
                                            <Image src={icons.CLOSE} alt="icon-delete" width={12} height={12} />
                                        </button>
                                    </div>
                                    <p className="text-[#828282] pl-2">{dataReply.message}</p>
                                </div>
                            )}
                            <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type your message' className='w-full h-12 bg-transparent border-2 border-[#828282] rounded-lg focus:outline-none px-2' />
                        </div>
                        <input type="submit" value='Send' className='w-20 h-12 bg-[#2F80ED] text-white rounded-lg cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
  )
}
