import { useParams } from 'react-router-dom';

export function FileView() {
    const { filename } = useParams<{ filename: string }>();

    if (!filename) {
        return <div>Arquivo não encontrado.</div>;
    }

    const fileUrl = `http://localhost:3000/upload/${filename}`;

    return (
        <div>
            <h2>Visualizando o arquivo PDF</h2>
            <iframe
                title="PDF Viewer"
                src={fileUrl}
                width="100%"
                height="600px"
                style={{ border: 'none' }}
            />
        </div>
    );
}
