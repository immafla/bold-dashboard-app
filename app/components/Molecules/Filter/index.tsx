'use client'
import { useState } from 'react'
import styles from './filter.module.css'
import { 
    Button,
    Checkbox
} from '@/components';

interface Props {

}

export function Filter({  }: Readonly<Props>) {

    const [dataphone, setDataphone] = useState(false)
    const [link, setLink] = useState(false)
    const [all, setAll] = useState(false)

    return (
        <>
            <div className={styles.filterDefaultsContainer}>
                <Button label='Hoy' click={()=>console.log('hola')} aditionalStyles={styles.filterDefaultButton}/>
                <Button label='Esta semana'click={()=>console.log('hola')} aditionalStyles={styles.filterDefaultButton}/>
                <Button label='${Junio}'click={()=>console.log('hola')} aditionalStyles={styles.filterDefaultButton}/>
            </div>
            <div className={styles.filterOptionsContainer}>
                <Button label='Filtrar'click={()=>console.log('hola')} aditionalStyles={styles.filterButton}/>
                
                <div className={styles.filterOptions}>
                    <header className={styles.headerFilterOptions}>
                        <p>
                            Filtrar
                        </p>
                        <p>
                            x
                        </p>
                    </header>
                    <Checkbox label='Cobro con datafono' id='datafono' checked={dataphone} handleChange={()=> setDataphone(prevStatus => !prevStatus)}/>
                    <Checkbox label='Cobro con link de pago' id='link' checked={link} handleChange={()=> setLink(prevStatus => !prevStatus)}/>
                    <Checkbox label='Ver todos' id='todos' checked={all} handleChange={()=> setAll(prevStatus => !prevStatus)}/>

                    <Button label='Aplicar'click={()=>console.log('hola')} aditionalStyles={styles.filterOptionsButton}/>
                </div>
            </div>
        </>
    );
}