import React from 'react'
import Sidebar from '../Sidebar'
import Menu from '../Menu'

export default function Container({ children } : {readonly children: React.ReactNode}) {
  return (
    <section className="bg-gray-600 fixed w-full">
        <div className="flex flex-row overflow-x-hidden ">
            <Sidebar />
            {/* <Menu /> */}
            <div className="flex-1">{children}</div>
        </div>
    </section>
  )
}
