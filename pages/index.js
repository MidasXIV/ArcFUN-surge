import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { connectToDatabase } from '../lib/mongodb'
import LevelCard from '../components/level-card';

export async function getServerSideProps(context) {
  const { client, db } = await connectToDatabase()

  const isConnected = await client.isConnected();

  const listingsAndReviews = await db.collection("listingsAndReviews").find().sort({_id:1}).limit(2).toArray();
  console.log(listingsAndReviews.map(item => ({
    name: item.name,
    summary: item.summary
  })))

  return {
    props: { isConnected },
  }
}

const Home = ({ isConnected }) => {
  const user = useUser()

  const cardProps = {
    title:"Level 145", 
    summary:"Unlocked at 2:30 PM", 
    state:"neutral",
    hints: 1
  }
  return (
    <Layout>
      <div class="text-6xl pb-4 font-semibold text-gray-900 leading-none">Login to join the Fun!</div>
      {isConnected ? (
        <>
          <h2 className="font-mono">You are connected to MongoDB</h2>
          <div class="p-2 rounded-md bg-black w-min">
            <span class="block h-4 w-4 bg-green-400 rounded-full bottom-0 right-0"></span>
          </div>
    </>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

          <LevelCard {...cardProps} />

      <h1 className="pb-2 font-mono">Magic Example</h1>

      <p>Steps to test this authentication example:</p>

      <ol>
        <li>Click Login and enter an email.</li>
        <li>
          You'll be redirected to Home. Click on Profile, notice how your
          session is being used through a token stored in a cookie.
        </li>
        <li>
          Click Logout and try to go to Profile again. You'll get redirected to
          Login.
        </li>
      </ol>

      <p>
        To learn more about Magic, visit their{' '}
        <a
          href="https://docs.magic.link/"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>
        .
      </p>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  )
}

export default Home
