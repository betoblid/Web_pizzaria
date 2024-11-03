"use client"

import { UploadCloud } from "lucide-react"
import style from "./style.module.scss"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api"
import { GetCookieClient } from "@/lib/GetCookiesClient"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface CategoryProps {
    id: string;
    name: string
}
interface FormProps {
    categores: CategoryProps[]
}

export function Form({ categores }: FormProps) {
    const router = useRouter()
    const [image, setImage] = useState<File>()
    const [preView, setPreView] = useState("")


    function HandleFile(file: ChangeEvent<HTMLInputElement>) {

        if (file.target.files && file.target.files[0]) {

            const image = file.target.files[0] //salvar imagem do primeiro indice do array

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato não suportado") // mensagem de erro
                return; //pare a execução do código
            }
            setImage(image)
            setPreView(URL.createObjectURL(image))
            return;
        }

        toast.warning("selecione uma imagem!") // mensagem de erro
    }

    async function HandleRegisterProduct(formData: FormData) {

        //pegando os dados do formulário passado pela action
        const name = formData.get("nameProduct")
        const categoryIndex = formData.get("category")
        const price = formData.get("priceProduct")
        const description = formData.get("description")

        //validando se todos os campos foi preenchidos
        if (!name || !categoryIndex || !image || !price || !description) {
            toast.warning("Preencha todos os campos")
            return;
        }
        //instanciando object form
        const Data = new FormData()

        //banner, category_id, description, name, price
        //passando informações para o object criado como FORMDATA
        Data.append("file", image)
        Data.append("category_id", categores[Number(categoryIndex)].id)
        Data.append("description", description)
        Data.append("name", name)
        Data.append("price", price)

        const token = GetCookieClient()

        await api.post("/newproduct", Data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() =>   toast.success("Produto registrado com sucesso!"))
            .catch((err) => {
               toast.warning("Erro ao registrar um produto!")
                return;
            })

            router.replace("/dashboard")
    }


    return (
        <main className={style.container}>
            <h1>Novo Produto</h1>

            <form action={HandleRegisterProduct} className={style.form}>

                <label htmlFor="ImagePreview" className={style.labelImage}>
                    <span>
                        <UploadCloud size={24} color="#fff" />
                    </span>

                    <input
                        type="file"
                        name="file"
                        onChange={HandleFile}
                        accept="image/jpeg, image/png"
                        required
                        id="ImagePreview"
                    />
                    {/* Será mostrada uma imagem se existir uma URL em PREVIEW */}
                    {
                        preView && (
                            <Image
                                alt="Pre view logo produto"
                                src={preView}
                                fill={true}
                                quality={100}
                                priority={true}
                                className={style.preview}
                            />
                        )
                    }
                </label>

                <select name="category">
                    {
                        categores ?
                            categores.map((item, index) => (
                                <option value={index} key={item.id}>
                                    {item.name}
                                </option>
                            ))
                            : (
                                <option value="Categoria" key={1}>
                                    Categoria
                                </option>
                            )
                    }

                </select>

                <input
                    type="text"
                    required
                    placeholder="Digite o nome do produto..."
                    className={style.input}
                    name="nameProduct"
                />

                <input
                    type="text"
                    required
                    placeholder="Digite o Preço do produto..."
                    className={style.input}
                    name="priceProduct"
                />

                <textarea
                    name="description"
                    className={style.input}
                    required
                    placeholder="Digite uma descrição para o produto...">

                </textarea>

                <Button name="Cadastrar Produto" />
            </form>
        </main>
    )
}