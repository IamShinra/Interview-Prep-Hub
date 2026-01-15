import React from 'react'

function FriendsPanal() {
    return (
        <div className='w-full h-full overflow-y-scroll'>
            <div className='w-full h-full'>
                <table className="w-full h-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 overflow-hidden">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Jane Cooper
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            jane.cooper@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Jane Cooper
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            jane.cooper@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Jane Cooper
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            jane.cooper@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Jane Cooper
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            jane.cooper@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FriendsPanal
