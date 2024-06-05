import React, { useState, Fragment, useRef, useEffect } from 'react';
import EditableText from '@/components/atoms/EditableText';
import EditableTextArea from '@/components/atoms/EditableDataArea';
import Image from 'next/image'; // Assuming you are using Next.js
// import DatePicker from 'react-datepicker'; // Importing DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker CSS
import icons from '@/assets/icons';
import { WORK } from '@/assets/iconsEditable';
import DatePicker from '@/components/atoms/DatePicker';
import { MultiSelect } from '@/components/atoms/MultiSelect';

const TaskList = ({ data, setData, isDataAdd, handleDelete } : {readonly data:any[] | null, setData: React.Dispatch<React.SetStateAction<any[]>>, isDataAdd:boolean, handleDelete: (index:number) => void}) => {
    // const [isChecked, setIsChecked] = useState(data)
    const lastTaskRef = useRef<HTMLDivElement>(null);

    const overDeadline = (date:any) => {
        let today = new Date();
        let deadline = new Date(date);

        today.setHours(0, 0, 0, 0);
        deadline.setHours(0, 0, 0, 0);

        const selisih = today.getTime() - deadline.getTime();

        const dayInMilisecond = 1000 * 60 * 60 * 24;

        const day = selisih / dayInMilisecond;

        if(day < 0) {
            return ""
        } else if(day === 0) {
            return "Due Today"
        } else {
            return `${day} days left`
        }
    }

    const handleDateChange = (date:any[] | null, index:number) => {
        const newDates = [...(data ?? [])];
        newDates[index].date = date;
        setData(newDates);
    };

    const handleChecked = (index:number, isComplete:boolean) => {
        const newIsComplete = [...(data ?? [])];
        newIsComplete[index].isComplete = !isComplete;
        setData(newIsComplete);
    }

    const handleTagsChange = (index:number, selectedOption:any) => {
        const newTags = [...(data ?? [])];
        newTags[index].tags = selectedOption.map((item:any) => item.value);
        setData(newTags);
    }



    const handleShowDelete = (e:any) => {
        let elements = document.querySelectorAll("[data-menu]");
        const dataElements = Array.from(elements);

        dataElements.forEach((element, elIndex) => {
            let main = dataElements[elIndex];
            let dataDelete = main?.parentElement?.parentElement?.parentElement?.querySelector("#delete" + elIndex);
            let getDeleteSelection =  e.target?.parentElement?.querySelector("#delete" + elIndex);

            if(dataDelete === getDeleteSelection) {
                dataDelete?.classList.toggle("hidden");
            }
        });
    }


    const handleToggle = (index:number, event:any) => {
        let elements = document.querySelectorAll("[data-menu]");
        const dataElements = Array.from(elements);

        dataElements.forEach((element, elIndex) => {
            let main = dataElements[elIndex];
            let dataAccordion = main?.parentElement?.parentElement?.parentElement?.querySelector("#menu");
            let getIdPassingAccordion = main?.parentElement?.parentElement?.parentElement?.querySelector("#component" + elIndex);
            const getIdComponent = event.target?.parentElement.querySelector("#component" + elIndex);
            const indicators = event.target?.parentElement.querySelectorAll("svg");

            if (getIdComponent === getIdPassingAccordion) {
                indicators[0].classList.toggle("rotate-180");
                dataAccordion?.classList.toggle("hidden");
            }
        });
    };

    useEffect(() => {
        if(lastTaskRef.current && isDataAdd) {
            lastTaskRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [isDataAdd])



    return (
        <div>
            {data?.map((item, index) => (
                <Fragment key={index}>
                    <div className='border-b-2 py-[22px]' ref={index === data.length - 1 ? lastTaskRef : null}>
                        <div className='w-full flex flex-row'>
                            <div className='w-[320px] text-sm font-semibold text-[#828282] text-left flex flex-row gap-2 justify-between items-center'>
                                {/* <input
                                    type='checkbox'
                                    className='w-5 h-5 mt-1'
                                    checked={item?.isComplete}
                                    readOnly
                                /> */}
                                {item?.isComplete ? (
                                    <button 
                                        className="w-10 h-12 mt-1"
                                        onClick={() => handleChecked(index, item?.isComplete)}
                                    >
                                        <Image src={icons.CHECBOX_CHECKED} width={25} height={25} alt="checked" />
                                    </button>
                                ) : (
                                    <button 
                                        className="w-10 h-12 mt-1"
                                        onClick={() => handleChecked(index, item?.isComplete)}
                                    >
                                        <Image src={icons.CHECKBOX_UNCHECKED} width={25} height={25} alt="unchecked" />
                                    </button>
                                )}
                                <EditableText initialText={item?.title} isComplete={item.isComplete} id={item?.id} data={data} setData={setData} />
                            </div>
                            <div className='w-[300px] ml-4 text-xs font-normal text-[#828282] flex flex-row gap-4 items-center'>
                                <p className='text-xs text-right text-red-500 w-2/4'>{item?.date ? overDeadline(item?.date) : ""}</p>
                                <p className='text-xs text-right w-1/2'>{new Date(item?.datePosted).toLocaleDateString('id-ID')}</p>
                                <button
                                    aria-label="toggler"
                                    className='w-8 h-5 flex justify-start'
                                    id="mainHeading"
                                    data-menu
                                    onClick={(e) => handleToggle(index, e)}
                                >
                                    <svg
                                        id={`component${index}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className={`inline w-5 h-6 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                                
                                {/* DELETE BUTTON */}
                                <button onClick={(e:any) => handleShowDelete(e)} className='w-8 h-5'>
                                    <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                                            fill="#828282"
                                        />
                                    </svg>
                                </button>
                                {/* END DELETE BUTTON */}
                                
                                {/* TOOLTIP DELETE */}
                                <div id={`delete${index}`} className={`hidden z-10 relative top-8 right-10 width-full  bg-white h-8 `}>
                                    <button onClick={() => handleDelete(index)} className='text-sm text-[#EB5757] w-24 h-12 px-2 py-2 mb-4 rounded-lg shadow-md  font-normal border-2 border-[#4F4F4F]'>Delete</button>
                                </div>
                                {/* END TOOLTIP DELETE */}

                            </div>
                        </div>
                        <div id="menu" className="hidden w-full flex flex-col transform transition-all duration-300 ease-in-out">
                            <div className='w-full flex flex-row gap-2 items-center mt-2'>
                                <WORK width={20} height={20} color={item?.date ? '#2F80ED' : '#4F4F4F'} />
                                <div className='w-[180px] my-2 ml-2 text-sm h-8 font-normal text-[#828282] rounded-lg p-2 flex flex-row items-center'>
                                    <DatePicker
                                        selected={data ? data[index].date : null}
                                        onChange={(date:any) => handleDateChange(date, index)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row gap-4 items-center mt-2'>
                                {/* <Image src={icons.EDIT} alt='edit' width={20} height={20} /> */}
                                <EditableTextArea initialText={item?.body} id={item?.id} data={data} setData={setData} />
                            </div>
                            <div className='w-full pt-2 flex flex-row gap-4 items-center mt-2'>
                                <Image src={icons.TAGS} alt='tags' width={20} height={20} />
                                <MultiSelect className='w-3/4 outline-0 ' dataApi={item?.tags} onChange={(selectedOption: any) => handleTagsChange(index, selectedOption)}  />
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default TaskList;