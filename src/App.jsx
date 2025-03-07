import { useState } from 'react';
import './App.css';

const JioTracker = () => {
    const [image, setImage] = useState(null);
    const [dateTime, setDateTime] = useState('');
    const [texts, setTexts] = useState(['', '','Kasaragod', 'Kerala']);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (index, value) => {
        const newTexts = [...texts];
        newTexts[index] = value;
        setTexts(newTexts);
    };

    const drawImageWithText = () => {
        if (!image) {
            alert('Please select an image first');
            return;
        }

        const updatedTexts = [dateTime, ...texts.slice(1)]; // Ensure dateTime is always up-to-date

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            ctx.font = '23px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'right';

            updatedTexts.forEach((text, index) => {
                const textX = img.width - 20; 
                const textY = img.height - 30 - ((updatedTexts.length - 1 - index) * 30);
                ctx.fillText(text, textX, textY);
            });
        };
    };

    const handleDownload = () => {
        const canvas = document.getElementById('canvas');
        const link = document.createElement('a');
        link.download = 'Time-Stamp.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="tracker-container">
            <h1>Time Stamp</h1>
            <input className="file-input" type="file" accept="image/*" onChange={handleImageUpload} />
            <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="date-time-input"
            />
            <div className="text-inputs" style={{paddingTop:"30px"}}>
                {texts.map((text, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Lat-long`}
                        value={index === 0 ? dateTime : text}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                        className="text-input"
                    />
                ))}
            </div>
            <div className="button-group">
                <button onClick={drawImageWithText} className="action-button">Add Text</button>
                <button onClick={handleDownload} className="action-button">Download Image</button>
            </div>
            <canvas id="canvas" className="image-canvas"></canvas>
        </div>
    );
};

export default JioTracker;
