import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <React.Fragment>
            <footer className="footer bg-gray-800 shadow text-white px-5 py-4">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
                            {currentYear} © <span className=''>P & M</span>.
                        </div>
                        <div className="md:w-1/2 text-center md:text-right">
                            <div className="text-sm d-none d-sm-block">
                                Design & Develop by
                                <a href="#" className="ms-1 underline">
                                    Web-Bocket
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer
