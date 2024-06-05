'use client';

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import icons from '@/assets/icons';

export default function DatePicker({selected, onChange} : { readonly selected: any ,  readonly onChange: (date:any) => void }) {

  return (
    <div className="relative w-full h-10 flex flex-row gap-2 border-[#828282] border-2 py-2 px-2 my-4 text-sm">
        <ReactDatePicker
            // maxDate={new Date()}
            enableTabLoop={false}
            selected={selected}
            onChange={onChange}
            autoComplete="off"
            dateFormat="dd/MM/yyyy"
            className={
            ' pt-[-4px] mb-8 bg-transparent border-0 w-full text-sm text-[#4f4f4f] focus:outline-none focus:border-[#fffff]'}
            // selected={startDate}
            placeholderText='dd/mm/yyyy'
            renderCustomHeader={({
                decreaseMonth,
                increaseMonth,
                monthDate,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="flex w-full justify-between items-center bg-white p-2">
                    <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                    >
                        {'<'}
                    </button>
                    <span className="react-datepicker__current-month">
                        {monthDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                        })}
                    </span>
                    <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                    >
                        {'>'}
                    </button>
                </div>
            )}

            calendarContainer={() => (
                <div className="input_global w-8  bg-white rounded-lg absolute top-2 left-[50px] z-10">
                    <ReactDatePicker
                        inline
                        selected={selected}
                        onChange={onChange}
                        className='py-4 bg-transparent rounded-lg'
                    />
                </div>
            )}
        />
        <Image 
            src={icons.WORK} 
            width={16} 
            height={16} 
            alt='work'
            className='absolute right-[10px] translate-y-[-50%] top-[50%]' 
        
        />

    </div>
  )
}
