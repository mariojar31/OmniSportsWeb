import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import { MaterialSymbol } from "material-symbols";


export default function Layout({children}){
    return(
        <>

            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

                <title>OmniSports | Lo mejor del Futbol en un mismo lugar.</title>
            </Head>

            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
    

        </>
        
    )
}