import { useState } from "react";
import type { ChangeEvent } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

import styles from "@/styles/QRForm.module.scss";

const QRForm = () => {
  const [codeData, setCodeData] = useState<string>("");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("QR-код сгенерирован");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const handleLatitudeChange = (event: ChangeEvent) => {
    event.preventDefault();
    setLatitude((event.target as HTMLInputElement).value);
  };

  const handleLongitudeChange = (event: ChangeEvent) => {
    event.preventDefault();
    setLongitude((event.target as HTMLInputElement).value);
  };

  const generateQRCode = () => {
    if (!isGenerated) {
      setIsGenerated(true);
      setAlertOpen(true);
      setCodeData(`https://github.com`);
      return;
    }

    setMessage("Вы уже сгенерировали QR-код");
    setAlertOpen(true);
  };

  const downloadQRCode = async () => {
    const qrcode = document.getElementById("qr-code");

    if (qrcode) {
      const canvas = await html2canvas(qrcode);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = data;
      link.download = "qrcode.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.qrFormContainer}>
      <h1>Создать QR-код</h1>

      <div className={styles.qrForm}>
        <div className={styles.qrFields}>
          <div>
            <p>Широта</p>
            <input onChange={handleLatitudeChange} value={latitude} />
          </div>

          <div>
            <p>Долгота</p>
            <input onChange={handleLongitudeChange} value={longitude} />
          </div>

          <div className={styles.qrButtonForm}>
            <Button
              className={styles.qrButton}
              variant="contained"
              onClick={generateQRCode}
            >
              Сгенерировать QR-код
            </Button>
          </div>
        </div>

        {isGenerated && (
          <div className={styles.qrCode}>
            <div id="qr-code" onClick={downloadQRCode}>
              <QRCodeSVG value={codeData} size={180} />
            </div>
            <Button color="secondary" onClick={downloadQRCode}>
              Скачать QR-код
            </Button>
          </div>
        )}
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert className={styles.qrAlert} onClose={() => setAlertOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QRForm;
