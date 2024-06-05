import {useEffect, useState} from 'react'
import Image from 'next/image'
import icons from '@/assets/icons'
import { useDebounce } from '@uidotdev/usehooks'

export default function EditableTextArea({initialText, rows, data, id, setData } : {readonly initialText:string, readonly rows?:number, data:any[], id:number, setData:any}) {

    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(initialText)
    const debounceValueArea = useDebounce(text, 500)

    const handleBlur = () => {
        setIsEditing(false)
    }

    const handleClick = () => {
        setIsEditing(true)
    }


    const handleChange = (e:any) => {
        setText(e.target.value);
    };


    const updateText = (text:string) => {
        setText(text)
    }

    useEffect(() => {
        if (!isEditing) {
            updateText(initialText);
        }
    
    }, [initialText, isEditing]);

    useEffect(() => {

        if(debounceValueArea) {
            const changeText = async () => {
                let listData = data.map((item:any) => {
                    if(item.id === id) {
                        return {
                            ...item,
                            body: debounceValueArea
                        }
                    }
                    return item
                })
        
                setData(listData);
            }

            changeText();
        }
    }, [debounceValueArea])

  return (
    isEditing ? (
        <div className="w-full h-full flex flex-row gap-2 items-center">
            <Image src={icons.EDIT} alt='edit' width={20} height={20} />
            <textarea
                className="w-full h-full py-2 text-sm text-[#4f4f4f] focus:border-2 focus:border-[#828282]"
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={rows ?? 3}
                autoFocus
            />
        </div>
    ) : (
        <div className="w-full h-full flex flex-row gap-2 items-center">
            <button className="w-10 h-8" onClick={handleClick}>
                <Image src={icons.EDIT} alt='edit' width={18} height={18} />
            </button>
            <p className="text-sm font-semibold  w-full cursor-pointer text-sm text-[#4f4f4f]" onClick={handleClick}>
                {text}
            </p>
        </div>
    )

  )
}
