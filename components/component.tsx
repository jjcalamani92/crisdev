import { FC } from "react";

interface Main {
  children: React.ReactNode;
}

export const Main: FC<Main> = ({ children }) => {
  return (
    <div className="bg-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}
interface Button {
  name: string;
}
export const Button: FC<Button> = ({ name }) => {
  return (
    <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
      {name}
    </button>

  )
}

interface HeadingPrimary {
  title: string;
}
export const HeadingPrimary: FC<HeadingPrimary> = ({ title }) => {
  return (
    <Main>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl lg:text-7xl text-center font-bold text-gray-800 leading-normal">{title}</h1>
    </div>
    </Main>
  )
}