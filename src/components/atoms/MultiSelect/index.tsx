import React, { useState } from 'react';

import Select from 'react-select';
// import { colourOptions } from '../data';

const tagsOptions = [
    {
        label: 'Important ASAP',
        value: 'Important ASAP',
    },
    {
        label: 'Offline Meeting',
        value: 'Offline Meeting',
    },
    {
        label: 'Virtual Meeting',
        value: 'Virtual Meeting',
    },
    {
        label: 'Client Related',
        value: 'Client Related',
    },
    {
        label: 'Self Task',
        value: 'Self Task',
    },
    {
        label: "Appointments",
        value: "Appointments"
    },
    {
        label: "Court Related",
        value: "Court Related"
    }
]

export const MultiSelect = ({className, dataApi, onChange,...props} : {className?:string, dataApi:any, onChange:any}) => {

    const [isEditing , setIsEditing] = useState(false);

    const dataValue = dataApi.map((item:any) => {
        return {
            label: item,
            value: item
        }
    })

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleBlur = () => {
        setIsEditing(false);
    }



    return (
        isEditing ? (
            <Select
            isMulti
            name="colors"
            value={dataValue}
            options={tagsOptions}
            onBlur={handleBlur}
            onChange={onChange}
            className={`basic-multi-select ${className}`}
            classNamePrefix="select"
            isSearchable
            isClearable
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    // border: '2px solid #828282',
                    borderRadius: '8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '48px',
                    boxShadow: "none",
                    '&:hover': {
                        border: 'none'
                    },
                    color: '#4f4f4f',
                    border: state.isFocused ? "none" : undefined
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    padding: '0 8px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flex: 1,
                    alignItems: 'center',
                    overflow: 'hidden',
                }),
                multiValue: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
                    ...styles,
                    backgroundColor: data?.value == 'Important ASAP' ? '#E5F1FF' : data.value == 'Offline Meeting' ? '#FDCFA4' : data.value == 'Virtual Meeting' ? '#F9E9C3' : data.value == 'ASAP' ? '#AFEBDB' : data.value == 'Client Related' ? '#CBF1C2' : data.value == 'Self Task' ? '#CFCEF9' : data.value == 'Appointments' ? '#F9E0FD' : data.value == 'Court Related' ? '#F0F0F0' : '#FFFFF',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4f4f4f',
                    padding: '2px 4px',
                    margin: '2px',
                }),
                multiValueLabel: (provided, state) => ({
                    ...provided,
                    color: '#4f4f4f',
                    fontSize: '0.875rem',
                    padding: '0',
                    margin: '0',
                }),
                multiValueRemove: (provided, state) => ({
                    ...provided,
                    color: 'white',
                    cursor: 'pointer',
                    ':hover': {
                        backgroundColor: '#2F80ED',
                        color: 'white',
                    },
                }),
                indicatorSeparator: (provided, state) => ({
                    ...provided,
                    display: 'none',
                }),
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    color: '#4f4f4f',
                    ':hover': {
                        color: '#2F80ED',
                    },
                }),
                clearIndicator: (provided, state) => ({
                    ...provided,
                    color: '#2F80ED',
                    ':hover': {
                        color: '#2F80ED',
                    },
                }),
                menu: (provided, state) => ({
                    ...provided,
                    boxShadow: 'none',
                    border: "none",
                    borderRadius: '8px',
                    overflow: 'hidden',
                }),
                option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
                    ...styles,
                    color: '#4f4f4f',
                    borderRadius: '5px',
                    padding: '5px 5px',
                    marginBottom: '5px',
                    marginHorizontal: '5px',
                    backgroundColor: data?.value == 'Important ASAP' ? '#E5F1FF' : data.value == 'Offline Meeting' ? '#FDCFA4' : data.value == 'Virtual Meeting' ? '#F9E9C3' : data.value == 'ASAP' ? '#AFEBDB' : data.value == 'Client Related' ? '#CBF1C2' : data.value == 'Self Task' ? '#CFCEF9' : data.value == 'Appointments' ? '#F9E0FD' : data.value == 'Court Related' ? '#F0F0F0' : '9DD0ED',
                }),
            }
            }
            {...props}
          />
        ) : (
            <p className="text-sm font-semibold ml-2 w-full cursor-pointer text-sm text-[#4f4f4f]" onClick={() => handleEdit()}>
                {dataValue.map((item:any, index:number) => (
                    <span key={index} className={`${item.label === 'Important ASAP' ? 'bg-[#E5F1FF]' : item.label === 'Offline Meeting' ? 'bg-[#FDCFA4]' : item.label === 'Virtual Meeting' ? 'bg-[#F9E9C3]' : item.label === 'Client Related' ? 'bg-[#CBF1C2]' : item.label === 'Self Task' ? 'bg-[#CFCEF9]' : item.label === 'Appointments' ? 'bg-[#F9E0FD]' : item.label === 'Court Related' ? 'bg-[#F0F0F0]' : 'bg-[#FFFFFF]'} text-[#4f4f4f] px-2 py-2 rounded-full mr-2`}>
                        {item.label}
                    </span>
                ))}
            </p>
        )
      );
}