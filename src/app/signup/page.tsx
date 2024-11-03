
import Image from "next/image";
import Link from "next/link";
import style from "../page.module.scss";
import LogoImg from "/public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";


export default function Signup() {

  //declarando que será uma function usada do lado do servidor
  async function HandleRegister(FormData: FormData) {
    "use server"

    //Pegando os campos do formulário.
    const name = FormData.get("name");
    const email = FormData.get("email");
    const password = FormData.get("password");

    //validando os campos do formulário.
    if(name === "" || email === "" || password === ""){

      console.log("ERRO!!")
      return
    }

    //fazendo uma chamada a api
    try {

      await api.post("/users", {
        name,
        email,
        password
      });

    } catch (err) {

      //caso der errom retorne a mensagem de erro para o servidor.
      console.log("Erro ao chamar a API");
      console.log(err)
      return
    }

     //se a chamada a API der status da categoria 200, será redirecionado para página principal para fazer login.
     redirect("/");
  }

  return (
    <>
      <div className={style.ContainerCenter}>
        <Image
          src={LogoImg}
          alt="Logo da Pizzaria Sujeito" />


        <section className={style.Login}>

          <h1>Crie sua conta.</h1>

          <form action={HandleRegister}>
            <input
              type="text"
              
              placeholder="Digite seu Nome.."
              name="name"
              className={style.input}
            />
            <input
              type="email"
              required
              placeholder="Digite seu E-mail.."
              name="email"
              className={style.input}
            />
            <input
              type="password"
              required
              placeholder="*******"
              name="password"
              className={style.input}
            />

            <button type="submit">Cadastrar</button>
          </form>
          <Link href="/signup" className={style.text}>já possui uma conta? Entrar</Link>
        </section>
      </div>
    </>
  );
}
