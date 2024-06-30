import Head from "next/head";
import Game from "@/components/Game/Game";

export default function Home() {
  return (
    <>
        <Head>
            <title>Wordle</title>
        </Head>
        <Game/>
    </>
  );
}