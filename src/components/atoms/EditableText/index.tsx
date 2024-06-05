import React, { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

const EditableText = ({ initialText, isComplete, setData, data, id } : {readonly initialText:string, isComplete:boolean, setData:any, data:any, id:number}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const debounceValue = useDebounce(text, 500);

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e:any) => {
        setText(e.target.value);
    };

    const updateText = (text:string) => {
        setText(text);
    }

    useEffect(() => {
        if (!isEditing) {
            updateText(initialText);
        }
    
    }, [initialText, isEditing]);

    useEffect(() => {

        if(debounceValue) {
            const changeText = async () => {
                let listData = data.map((item:any) => {
                    if(item.id === id) {
                        return {
                            ...item,
                            title: debounceValue
                        }
                    }
                    return item
                })
        
                setData(listData);
            }

            changeText();
        }
    }, [debounceValue])

    return (
        isEditing ? (
            <input
                type="text"
                className="w-full h-full text-sm text-[#4f4f4f] focus:border-2 focus:border-[#828282]"
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
            />
        ) : (
            <p className="text-sm text-[#4F4F4F] font-semibold ml-2 w-full cursor-pointer" onClick={handleClick}>
                {isComplete ? (
                    <s className='text-[#828282]'>{text}</s>
                ) : (
                    text
                )}
            </p>
        )
    );
};

export default EditableText;