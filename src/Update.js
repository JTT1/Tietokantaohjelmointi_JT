import React from 'react';
import {useState} from 'react';

export default function Update({tyonro, tyonimi, tyosposti, tyopuhnro, tyoosoite}) {

    const [ttnro, setTtnro] = useState(tyonro);
    const [ttnimi, setTtnimi] = useState(tyonimi);
    const [ttsposti, setTtsposti] = useState(tyosposti);
    const [ttpuhnro, setTtpuhnro] = useState(tyopuhnro);
    const [ttosoite, setTtosoite] = useState(tyoosoite);

    const url = "http://localhost/harjoitustyo"


    function updatetyontekija(e) {
        e.preventDefault();

        fetch(url + "/update.php",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ttnro,
                ttnimi: ttnimi,
                ttsposti: ttsposti,
                ttpuhnro: ttpuhnro,
                ttosoite: ttosoite
            })
        })
        .then(res => {
            return res.json();
        })
        .then (
            (res) => {
                if (res.status === 'ok') {
                alert('Päivitys onnistui!');
                }
            }, (error) => {
                alert(error);
            }
        )
    }




    return (
        <div className="container text-center">
            <h3>Gastropub X</h3>
            <h5>Päivitä työntekijöitä</h5>
            <form onSubmit={updatetyontekija}>
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
                    <button className="btn btn-primary">Päivitä</button>
                </div>
            </form>
            </div>
    )
}
