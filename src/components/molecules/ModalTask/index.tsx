'use client';

import {useEffect,useState} from 'react'
import { getApiTodoList } from '@/utils/api/apiTodoList';
import TaskList from '../TaskList';




export default function ModalTask({isOpenModalTask} : {readonly isOpenModalTask:boolean}) {
    const [data, setData] = useState<any[]>([]);
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataAdd, setIsDataAdd] = useState(false);

    const random = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomTags = (min:number, max:number) => {
        const tags = ['Important ASAP', 'Offline Meeting', 'Virtual Meeting', 'Client Related', 'Self Task', 'Appointments', 'Court Related'];
        const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        return tags[randomIndex];
    }

    const randomDate = (min:number, max:number) => {
        const today = new Date();
        const randomDay = random(min, max);
        today.setDate(today.getDate() + randomDay);
        return today;
    }

    const handleFilter = (filter:string) => {
        setIsShowFilter(false);
        if(filter === 'Personal Errands') {
            setIsLoading(true);
            getApiTodoList().then((data) => {
                const listData = data.map((item:any) => {
                    return {
                        ...item,
                        date: randomDate(0, 10),
                        isComplete: random(0, 1) === 1,
                        tags: [randomTags(0, 6)],
                        datePosted: new Date()
                    }
                })
    
                const filterData = listData.filter((item:any) => item.tags.includes('Self Task'));
                setData(filterData);
                setIsLoading(false);
    
            }).catch((error) => {
                throw error;
            })
        } else if(filter === 'Urgent To-Do') {
            setIsLoading(true);
            getApiTodoList().then((data) => {
                const listData = data.map((item:any) => {
                    return {
                        ...item,
                        date: randomDate(0, 10),
                        isComplete: random(0, 1) === 1,
                        tags: [randomTags(0, 6)],
                        datePosted: new Date()
                    }
                })
    
                const filterData = listData.filter((item:any) => item.tags.includes('Important ASAP') || item.tags.includes('Court Related') || item.tags.includes('Appointments') || item.tags.includes('ASAP'));
          
                setData(filterData);
                setIsLoading(false);

            }).catch((error) => {
                throw error
            })
        }
    }

    const AddTask = () => {
        const newTask = {
            id: data.length + 1,
            title: 'New Task',
            body: 'No Description',
            date: null,
            isComplete: false,
            tags: [''],
            datePosted: new Date()
        }

        setData([...data, newTask]);
        setIsDataAdd(true);
    }

    const handleDelete = (index:number) => {

        if(data) {
            const dataDelete = data.filter((_, i) => i !== index);
            setTimeout(() => {
                setData(dataDelete);
            }, 1000)
        }
    }


    const getTodoList = () => {
        setIsLoading(true);
        getApiTodoList().then((data) => {
            const listData = data.map((item:any, index:number) => {
                return {
                    ...item,
                    id: index,
                    date: randomDate(0, 10),
                    isComplete: random(0, 1) === 1,
                    tags: [randomTags(0, 6)],
                    datePosted: new Date()
                }
            })

            setData(listData)
            setIsLoading(false);

        }).catch((error) => {
            throw error
        })
    }


    useEffect(() => {
        getTodoList();
    }, [])


    

  return (
    <div className={`absolute bottom-32 right-10 w-[650px] h-[550px] bg-white rounded-lg transition-all ease-in-out duration-500 py-[24px] px-[32px] ${ isOpenModalTask ? '' : 'hidden'}`}>
        <div className='flex flex-row gap-2 items-center justify-between h-8 w-full  text-[#828282] rounded-lg'>
            <button onClick={() => setIsShowFilter(!isShowFilter)} className='w-[105px] text-sm ml-8 font-semibold h-10 border-2 border-[#828282] flex flex-row gap-2 px-2 rounded-lg items-center'>
                My Task
                <svg fill="currentColor" viewBox="0 0 20 20" 
                    className={`inline w-5 h-10 pt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${isShowFilter ? 'rotate-180' : 'rotate-0'}`}>
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>

            <button onClick={() => {
                    AddTask()
                    setTimeout(() => {
                        setIsDataAdd(false);
                    }, 1000)
                }} 
                className='w-[105px] text-sm font-semibold h-10  bg-[#2F80ED] text-white justify-center rounded-lg items-center'>
                New Task
            </button>
        </div>

        {/* Tooltip filter */}
        {isShowFilter && (
            <div className='absolute top-[65px] left-10 w-1/2 h-fit bg-white border-2 border-[#828282] rounded-lg'>
                <div className='flex flex-col justify-start items-start w-full h-full text-[#828282] '>
                    <button onClick={() => handleFilter('Personal Errands')}
                        className='text-sm font-semibold py-1 pl-2 border-b-2 border-[#828282] font-weight-400 flex flex row justify-start w-full'>
                        Personal Errands
                    </button>
                    <button onClick={() => handleFilter('Urgent To-Do')}
                        className='text-sm font-semibold py-1 pl-2 border-[#828282] font-weight-400 flex flex row justify-start w-full'>
                        Urgent To-Do
                    </button>
                </div>
            </div>
        )}
        {/* End Tooltip filter */}

        <div className='flex flex-col  h-[430px] h-max-[500px] overflow-y-auto w-full mt-[22px]'>
            {isLoading ? (
                <div className=' relative flex flex-col items-center justify-center w-full h-full gap-2 text-[#828282]'>
                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-20 h-20 animate-spin'>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.801 60.5045L67.6057 24.9025L67.6796 25.0058C67.6551 24.9713 67.6306 24.9369 67.606 24.9025C57.7748 11.1492 38.6557 7.96983 24.9024 17.8011C11.1492 27.6323 7.96981 46.7513 17.801 60.5045Z" fill="#C4C4C4"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M67.6059 24.9025L17.801 60.5047L17.7772 60.4716C17.7851 60.4826 17.793 60.4937 17.8009 60.5047C27.6322 74.258 46.7513 77.4374 60.5045 67.6061C74.2578 57.7748 77.4372 38.6558 67.6059 24.9025Z" fill="#F8F8F8"/>
                        <path d="M26.3986 59.0807C26.3986 61.4391 24.4867 63.351 22.1283 63.351C19.7698 63.351 17.8579 61.4391 17.8579 59.0807C17.8579 56.7222 19.7698 54.8103 22.1283 54.8103C24.4867 54.8103 26.3986 56.7222 26.3986 59.0807Z" fill="#C4C4C4"/>
                        <path d="M68.3256 27.2472C68.3256 29.6056 66.4137 31.5175 64.0553 31.5175C61.6968 31.5175 59.7849 29.6056 59.7849 27.2472C59.7849 24.8887 61.6968 22.9768 64.0553 22.9768C66.4137 22.9768 68.3256 24.8887 68.3256 27.2472Z" fill="#C4C4C4"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1859 55.9404C31.4963 66.1672 45.7131 68.5313 55.9399 61.2209C66.1666 53.9105 68.5308 39.6937 61.2204 29.4669C53.9099 19.2402 39.6932 16.876 29.4664 24.1864C19.2396 31.4969 16.8755 45.7136 24.1859 55.9404Z" fill="white"/>
                    </svg>
                    <p className='text-md font-semibold mt-2'>Loading Task List...</p>
                </div>
            ) : (
                <TaskList data={data} setData={setData} isDataAdd={isDataAdd} handleDelete={handleDelete} />
            )}
        </div>

    </div>
  )
}
