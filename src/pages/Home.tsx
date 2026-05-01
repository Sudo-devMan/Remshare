
import { Link } from 'react-router-dom';
import hero from '../assets/gifs/hero.mp4'

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex align-center flex-col justify-center mb-8">
        <div className='sm:grid sm:grid-cols-2'>
          <div>
            <h1 className="text-center text-9xl bangers-font">Rem<br/>Share</h1>
            <p className="text-center text-2xl mb-15 caveat">
              Share files to anyone, anywhere
            </p>
            <div className="flex align-center justify-center gap-15">
              <Link to={'/share'}>
                <button className="share-sm">Share</button>
              </Link>
              <Link to={'/receive'}>
                <button className="receive-sm">Receive</button>
              </Link>
            </div>
          </div>
          <div className='hidden sm:block'>
            <video width={'540'} height={'300'} loop>
              <source src={hero} type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center flex-col mb-10">
        <div className="sm:grid sm:grid-cols-2 mb-8">
          <div className='w-full flex justify-center align-center'>
            <object type="image/svg+xml" data="src/assets/bgs/about.svg" width="360" height="260">
              <p>your device does not support svgs</p>
            </object>
          </div>
          <div className="p-2 m-3 rounded-xl">
              <h1 className="underline text-center text-4xl bangers-font mb-3">ABOUT REMSHARE</h1>
              <p className="caveat text-2xl text-center">
                RemShare is where we make it easy for you to share and receive files with anyone around the world, or your neighbor... idk :)
              </p>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2 mb-8">
          <div className="p-2 m-3 rounded-xl">
              <h1 className="text-center text-4xl bangers-font mb-3">HOW TO <span className="text-share">SHARE</span></h1>
              <p className="caveat text-2xl text-center">
                To share files, you are going to <span className="text-green-700">drop the files first</span>. Then add some info such as the <span className="text-green-800">receiver's email, files password for added security, and optionally a note</span> for the receiver. We have not yet implemented a service for notifying the receiver of the files you send. So be sure to tell them... or sumn.
              </p>
          </div>
          <div className='w-full flex justify-center align-center'>
            <object type="image/svg+xml" data="src/assets/bgs/send.svg" width="360" height="260">
              <p>your device does not support svgs</p>
            </object>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2">
          <div className='w-full flex justify-center align-center'>
            <object type="image/svg+xml" data="src/assets/bgs/receive.svg" width="360" height="260">
              <p>your browser aIn't support svgs</p>
            </object>
          </div>
          <div className="p-2 m-3 rounded-xl">
              <h1 className="text-center text-4xl bangers-font mb-3">HOW TO <span className="text-receive">RECEIVE</span></h1>
              <p className="caveat text-2xl text-center">
                This step is super straight-forward. Just <span className="text-yellow-600">click the receive button</span> and follow the given steps to receive the files. You are, however, going to need the files password the sender has set in order to receive the files
              </p>
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-300 flex align-center justify-center text-center caveat border font-bold p-10">
        &copy; {new Date().getFullYear()}, RemShare <br />
        Developed by Devman
      </footer>
    </>
  )
}

export default Home;

