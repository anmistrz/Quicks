import {useEffect, useState} from 'react'
import Image from 'next/image'
import icons from '@/assets/icons'
import { dummyDataChats} from '../ModalInbox/dummyDataChats';
import { getApiUser } from '@/utils/api/apiChats';
import DetailInbox from '../DetailInbox';
import { useDebounce } from '@uidotdev/usehooks';


export default function ModalInbox(
    {isOpenModalInbox, dataInbox, setIsOpenModalInbox, setDataInbox, setIsOpenInbox} 
    : 
    {
        readonly isOpenModalInbox:boolean, 
        readonly setIsOpenModalInbox: React.Dispatch<React.SetStateAction<boolean>>,
        readonly setIsOpenInbox: React.Dispatch<React.SetStateAction<boolean>>,
        readonly setDataInbox:any, 
        readonly dataInbox:any[]
    }
    ) {

    const [isDetailInbox, setIsDetailInbox] = useState(false)
    const [detailInbox, setDetailInbox] = useState<any[]>([])
    const [querySearch, setQuerySearch] = useState('')
    const debounceValue = useDebounce(querySearch, 500)
    const [isLoading, setIsLoading] = useState(false)



    const sortDataByDate = (data:any) => {
        return data.sort((a:any, b:any) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
    }

    const handleOpenDetailInbox = (index:number) => {
        const getDetail = dataInbox.filter((item, idx) => idx === index)
        const sortChatsByDate = getDetail.map((item) => {
            return {
                ...item,
                chats: sortDataByDate(item.chats)
            }
        })

        setDetailInbox(sortChatsByDate)
        setIsDetailInbox(true)
    }

    const handleSearch = (e:any) => {
        setQuerySearch(e.target.value)
    }

    const getRandomNumber = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const getUser = (querySearch?:string) => {
        setIsLoading(true)

        getApiUser().then((res:any) => {

            if( dataInbox.length > 0 && querySearch !== "" && querySearch !== undefined) {
                const mixData = dummyDataChats.map((item, index) => {
                    item.member = item.member.map((members:any, index:number) => {
                        members.name = res[getRandomNumber(0,10)]?.name
                        return members
                    })

                    item.member.length < 6 && item.member.push({
                        id: item.member.length + 1,
                        name: 'You',
                    })
    
                    item.title = res[getRandomNumber(0,10)]?.company.name
                    return item    
                })
    
                const getUserChats: any[] = mixData.map((item, index) => {
                    item.chats = item.chats.map((chats:any, index:number) => {
                        chats.name = item.member[index].name
                        return chats
                    })
                    return item
                })

                const filterData = getUserChats.filter((item) => item.title.toLowerCase().includes(querySearch?.toLowerCase()))
                setDataInbox(filterData)

                setIsLoading(false)
            } else {
                if(dataInbox.length === 0) {
                    const mixData = dummyDataChats.map((item, index) => {
                        item.member = item.member.map((members:any, index:number) => {
                            members.name = res[getRandomNumber(0,10)]?.name
                            return members
                        })
    
                        item.member.length < 6 && item.member.push({
                            id: item.member.length + 1,
                            name: 'You',
                        })
        
                        item.title = res[getRandomNumber(0,10)]?.company.name
                        return item    
                    })
        
                    const getUserChats: any[] = mixData.map((item, index) => {
                        item.chats = item.chats.map((chats:any, index:number) => {
                            chats.name = item.member[index].name
                            return chats
                        })
                        return item
                    })
                    setDataInbox(getUserChats)
                    setQuerySearch('')
                    setIsLoading(false)
                } 

            }
            setIsLoading(false)

        }).catch((error) => {
            throw new Error(error)
        })

    }


    useEffect(() => {
        getUser()

    },[])

    useEffect(() => {
        if(debounceValue) {
            getUser(debounceValue)
        }
    },[debounceValue])

  return (
    <>
        <div  className={`absolute bottom-32 right-10 w-[650px] h-[550px] bg-white rounded-lg transition-all ease-in-out duration-500  ${ isOpenModalInbox ? '' : 'hidden'}`}>
            {isDetailInbox ? (
                <DetailInbox 
                    dataInbox={dataInbox} 
                    detailInbox={detailInbox} 
                    setDataInbox={setDataInbox}
                    setDetailInbox={setDetailInbox} 
                    setIsDetailInbox={setIsDetailInbox}
                    setIsOpenModalInbox={setIsOpenModalInbox}
                    setIsOpenInbox={setIsOpenInbox}
                />
 
            ) : (
                <>                   
                    <div className=' w-full pt-[24px] px-[32px]'>
                        <div className='flex flex-row gap-2 px-2 justify-between items-center h-10 w-full  text-[#828282] border-2 border-[#828282] rounded-lg'>
                            <input onChange={(e:any) => handleSearch(e)} type="text" name='search' placeholder='Search' className='w-full h-full bg-transparent border-0 focus:outline-none' />
                            <Image src={icons.SEARCH_BLACK} width={16} height={16} alt='search' />
                        </div>
                    </div>

                        { isLoading ? (
                                <div className=' relative flex flex-col items-center justify-center w-full h-full gap-2 text-[#828282]'>
                                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-20 h-20 animate-spin'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.801 60.5045L67.6057 24.9025L67.6796 25.0058C67.6551 24.9713 67.6306 24.9369 67.606 24.9025C57.7748 11.1492 38.6557 7.96983 24.9024 17.8011C11.1492 27.6323 7.96981 46.7513 17.801 60.5045Z" fill="#C4C4C4"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M67.6059 24.9025L17.801 60.5047L17.7772 60.4716C17.7851 60.4826 17.793 60.4937 17.8009 60.5047C27.6322 74.258 46.7513 77.4374 60.5045 67.6061C74.2578 57.7748 77.4372 38.6558 67.6059 24.9025Z" fill="#F8F8F8"/>
                                        <path d="M26.3986 59.0807C26.3986 61.4391 24.4867 63.351 22.1283 63.351C19.7698 63.351 17.8579 61.4391 17.8579 59.0807C17.8579 56.7222 19.7698 54.8103 22.1283 54.8103C24.4867 54.8103 26.3986 56.7222 26.3986 59.0807Z" fill="#C4C4C4"/>
                                        <path d="M68.3256 27.2472C68.3256 29.6056 66.4137 31.5175 64.0553 31.5175C61.6968 31.5175 59.7849 29.6056 59.7849 27.2472C59.7849 24.8887 61.6968 22.9768 64.0553 22.9768C66.4137 22.9768 68.3256 24.8887 68.3256 27.2472Z" fill="#C4C4C4"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1859 55.9404C31.4963 66.1672 45.7131 68.5313 55.9399 61.2209C66.1666 53.9105 68.5308 39.6937 61.2204 29.4669C53.9099 19.2402 39.6932 16.876 29.4664 24.1864C19.2396 31.4969 16.8755 45.7136 24.1859 55.9404Z" fill="white"/>
                                    </svg>
                                    <p className='text-md font-semibold mt-2'>Loading Chats...</p>
                                </div>
                        ) : (
                                <div className='flex flex-col w-full gap-2 mt-[22px] h-[430px] overflow-y-auto pb-[24px] px-[32px]'>
                                    {dataInbox.map((data, index) => (
                                        <div key={index} onClick={() => handleOpenDetailInbox(index)} className='flex flex-row gap-4  py-2 justify-start text-md items-center  w-full  text-[#828282] border-b-2 border-[#828282] cursor-pointer'>
                                            <div className="h-full flex items-start py-2">
                                                 <Image src={icons.GROUP} width={50} height={50} alt='group' />
                                            </div>
                                            <div className="flex flex-col gap-2 py-2 w-full">
                                                <span className='text-[#333333] font-bold'>{data.title}</span>
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <div className="flex flex-row justify-between items-center h-full w-full gap-4">
                                                        <div className="flex flex-col w-full gap-1">
                                                            <span className='text-[#828282] font-bold'>{data.chats[data.chats.length-1].name}</span>
                                                            <span className='text-[#828282]'> {data.chats[data.chats.length-1].message}</span>
                                                        </div>
                                                        <span className=' w-2 h-2 bg-[#EB5757] rounded-full flex justify-center items-center text-white'></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        )}

                </>
            )}

        </div>

        {/* <DetailModalInbox index={index} isDetailInbox={isDetailInbox} /> */}
    </>
  )
}
