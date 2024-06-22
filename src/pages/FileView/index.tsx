import { useParams } from 'react-router-dom';

function FileView() {
    const { filename } = useParams<{ filename: string }>();

    return (
        <div>
            <h2>Visualizando o arquivo: {filename}</h2>
            <embed src={`/upload/${filename}`} type="application/pdf" width="100%" height="600px" />
        </div>
    );
}

export { FileView };
