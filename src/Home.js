import React, {useState, useEffect} from 'react'
import './App.css';
import {Link, Redirect} from 'react-router-dom';
import Update from './Update';
import {Collapse} from 'react-collapse';

export default function Home({tyontekijat, setTyontekijat}) {

    const [ttnimi, setTtnimi] = useState('');
    const [ttsposti, setTtsposti] = useState('');
    const [ttpuhnro, setTtpuhnro] = useState('');
    const [ttosoite, setTtosoite] = useState('');
    const [open, setOpen] = useState(false);

    const url = "http://localhost/harjoitustyo/"


    useEffect(async() => {
        try {

            const response = await fetch(url + 'read.php');
            const json = await response.json();

            if (response.ok) {
                setTyontekijat(json);
            } else {
                alert(json.error);
            }
        } catch (error) {
            alert(error);
        }
    }, [])

    function save(e) {
        e.preventDefault();
        console.log('save');

        fetch(url + "add.php",{
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ttnimi: ttnimi,
                ttsposti: ttsposti,
                ttpuhnro: ttpuhnro,
                ttosoite: ttosoite,
            })
        })
        .then (res => {
            return res.json();
        })
        .then (
            (res) => {
                if (res.status === 'ok') {
                alert('Lisäys onnistui!');
                }
            }, (error) => {
                alert(error);
            }
        )
    }


    function deletetyontekija(alt1) {
        console.log('save');

        fetch(url + "delete.php",{
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: alt1,
            })
        })
        .then (res => {
            console.log(res);
            return res.json();
        })
        .then (
            (res) => {
                if (res.status === 'ok') {
                alert('Poisto onnistui!');
                }
            }, (error) => {
                alert(error);
            }
        )
    }


    


    

    return (
        <div className="container text-center">
            <div className="pt-2 pb-2 tallennus">
            <h1>Gastropub X</h1>
            <h4>Työntekijät</h4>
            <form onSubmit={save}>
                {/* <div className="form-group">
                    <label for="Tyontekijanumero">Työntekijänumero </label>
                    <input id="tyontekijanumero" className="form-control"/>
                </div> */}
                <div className="form-group">
                    <label htmlFor="Tyontekijanimi">Työntekijän nimi </label>
                    <input id="tyontekijanimi" className="form-control" value={ttnimi} onChange={e => setTtnimi(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Tyontekijasposti">Työntekijän sähköposti </label>
                    <input htmlFor="tyontekijasposti" className="form-control" value={ttsposti} onChange={e => setTtsposti(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Tyontekijapuh">Työntekijän puhelinnumero </label>
                    <input id="tyontekijapuh" className="form-control" value={ttpuhnro} onChange={e => setTtpuhnro(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Tyontekijaosoite">Työntekijän osoite </label>
                    <input id="tyontekijaosoite" className="form-control" value={ttosoite} onChange={e => setTtosoite(e.target.value)}/>
                </div>
                <div className="pt-2">
                    <button className="btn btn-primary">Tallenna</button>
                </div>
            </form>
            </div>

            <div className="show">
                <h3>Tietokanta</h3>
                    {tyontekijat.map(tyontekija => {
                            return(
                                <>
                                <div className="tietokanta">
                                <tr>
                                <td className="lista pe-3 ">| {tyontekija.tyontekijanro} |</td>
                                <td className="lista pe-3">| {tyontekija.nimi} |</td>
                                <td className="lista pe-3">| {tyontekija.sposti} |</td>
                                <td className="lista pe-3">| {tyontekija.puhnro} |</td>
                                <td className="lista pe-3">| {tyontekija.osoite} |</td>
                                <td><button className="btn btn-danger" onClick={() => {deletetyontekija(tyontekija.tyontekijanro)}}>Poista</button></td>
                                </tr>
                                </div>
                                <div className="pt-3 pb-4 paivitys" id="joku">
                                    <Update tyonro={tyontekija.tyontekijanro} tyonimi={tyontekija.nimi} tyosposti={tyontekija.sposti} tyopuhnro={tyontekija.puhnro} tyoosoite={tyontekija.osoite}/>                             
                                </div>
                                </>
                            )
                        })}
            </div>
        </div>
    )
}
