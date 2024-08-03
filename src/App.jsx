
import QRCode from 'qrcode'//QRCode: qrcode kütüphanesi, QR kodu oluşturmak için kullanılır.

import { useState } from 'react'//useState: React'te bileşenlerin durumunu (state) yönetmek için kullanılan bir hook'tur.


function App() {
	const [url, setUrl] = useState('')//url: Kullanıcının QR kodunu oluşturmak istediği URL'yi saklar.
                                     //setUrl: url durumunu günceller
	const [qr, setQr] = useState('')//qr: Oluşturulan QR kodunun veri URL'sini saklar.
                                   //setQr: qr durumunu günceller							

	const GenerateQRCode = () => { //GenerateQRCode: QR kodu oluşturmak için çağrılan fonksiyon.
//QRCode.toDataURL(url, options, callback): Verilen URL'yi QR koda dönüştürür ve bir veri URL'si olarak döner.
		QRCode.toDataURL(url, {//OPTİONS
			width: 800,// QR kodunun genişliği (piksel cinsinden).
			margin: 2,// QR kodunun kenar boşluğu (piksel cinsinden).
			color: { //QR kodunun renk seçenekleri (koyu ve açık renkler).
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {//CALLBACK
			if (err) return console.error(err) //err: Hata durumu. Hata varsa, konsola yazdırılır.
                                               //url: QR kodunun veri URL'si.
			console.log(url)
			setQr(url)//Başarıyla oluşturulursa, URL setQr ile güncellenir ve konsola yazdırılır.

		})
	}

	return (
		<div className="app">
			<h1>QR Generator</h1>
			<input //Kullanıcının URL'yi girebileceği metin kutusu
				type="text"
				placeholder="e.g. https://google.com" // Metin kutusundaki örnek metin.
				value={url}
				onChange={e => setUrl(e.target.value)}// Kullanıcı metin kutusuna bir şey yazdığında, setUrl ile url güncellenir.
				/> 
			<button onClick={GenerateQRCode}>Generate</button> 
			{qr && <> {/*{qr && <> ... </>}: Eğer qr değişkeni doluysa (yani QR kodu oluşturulmuşsa), şu içerikler render edilir:*/}
			
				<img src={qr} /> {/*qr değişkenindeki QR kodu görüntüler.*/}
				<a href={qr} download="qrcode.png">Download</a> {/*qr değişkenindeki QR kodunu indirmek için bir bağlantı oluşturur.*/}
			</>}
		</div>
	)
}

export default App
