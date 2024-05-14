export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-neutral-100 bg-[url('/authBg.png')] bg-cover bg-center">
      <div className='bg-white flex items-center justify-center flex-col p-5 md:p-12 rounded-3xl md:w-[532px]'>
        {children}
      </div>
    </div>
  )
}
