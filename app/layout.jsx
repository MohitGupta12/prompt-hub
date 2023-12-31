import styles from '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider'

export const metadata = {
  title:'Prompt Hub',
  description: 'Discover and Share your AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className= "main">
                    <div className="gradient"></div>
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
    )
}

export default RootLayout