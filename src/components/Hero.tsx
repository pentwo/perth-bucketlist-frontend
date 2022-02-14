import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="bg-gradient-to-b from-indigo-200  to-white">
      <div className="container mx-auto flex flex-col items-center py-8 sm:py-18">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
            Perth{' '}
            <Link to="/">
              <span className="text-indigo-700">Bucket list</span>
            </Link>
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-xs">
            Inspire by Perth is OK{' '}
            <a
              className="underline underline-offset-4"
              href="https://perthisok.com/best-of-wa/best-things-to-do-perth/"
            >
              The Bucket List: 50 Things To Do Around Perth Before You Die
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
