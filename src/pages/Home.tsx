
import { Link } from 'react-router-dom';

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
            <img src="src/assets/bgs/hero.jpg" width={420} alt="hero image" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center flex-col mb-10">
        <div className="sm:grid sm:grid-cols-2 mb-8">
          <div className="p-2 m-3 rounded-xl">
              <h1 className="underline text-center text-4xl bangers-font mb-3">ABOUT REMSHARE</h1>
              <p className="caveat text-2xl text-center">
                RemShare is where we make it easy for you to share and receive files with anyone around the world, or your neighbor... idk :)
              </p>
          </div>
          <div className='w-full flex justify-center align-center'>
            <img src="src/assets/bgs/about.jpg" alt="about" width={360} />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2 mb-8">
          <div className='w-full flex justify-center align-center'>
            <img src="src/assets/bgs/sharing.jpg" alt="sharing" width={360} />
          </div>
          <div className="p-2 m-3 rounded-xl">
              <h1 className="text-center text-4xl bangers-font mb-3">HOW TO <span className="text-share">SHARE</span></h1>
              <p className="caveat text-2xl text-center">
                To share files, you are going to <span className="text-green-700">drop the files first</span>. Then add some info such as the <span className="text-green-800">receiver's email, files password for added security, and optionally a note</span> for the receiver. We have not yet implemented a service for notifying the receiver of the files you send. So be sure to tell them... or sumn.
              </p>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2">
          <div className="p-2 m-3 rounded-xl">
              <h1 className="text-center text-4xl bangers-font mb-3">HOW TO <span className="text-receive">RECEIVE</span></h1>
              <p className="caveat text-2xl text-center">
                This step is super straight-forward. Just <span className="text-yellow-600">click the receive button</span> and follow the given steps to receive the files. You are, however, going to need the files password the sender has set in order to receive the files
              </p>
          </div>
          <div className='w-full flex justify-center align-center'>
            <img src="src/assets/bgs/receive.jpg" alt="receive" width={360} />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2">
          <div className='w-full flex justify-center align-center'>
            <img src="src/assets/bgs/info.jpg" alt="receive" width={360} />
          </div>
          <div className="p-2 m-3 rounded-xl">
              <h1 className="text-center text-4xl bangers-font mb-3">PLEASE <span className="text-red-600">NOTE</span></h1>
              <p className="caveat text-2xl text-center">
                All shared files will be <span className="text-green-600">available to be received in 24 hours</span>. You can pay a <span className="text-green-600">$2/24h</span> fee to keep them available for longer. Ciao!
              </p>
          </div>
        </div>
      </div>

      <center><section className='p-4 mt-30 mb-20'>
        <h1 className="bangers-font text-7xl text-center text-green-800 mb-10">
          SO WHAT ARE YOU WAITING FOR?
        </h1>
        <Link to={'/share'}>
          <button className='share-lg'>
            Shart sharing
          </button>
        </Link>
      </section></center>

      <footer className="w-full bg-gray-300 flex align-center justify-center text-center caveat border font-bold p-10">
        &copy; {new Date().getFullYear()}, RemShare <br />
        Developed by Devman
      </footer>
    </>
  )
}

export default Home;

