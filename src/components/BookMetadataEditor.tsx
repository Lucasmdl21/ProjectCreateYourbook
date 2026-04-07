import { useState } from 'react';
import type { BookMetadata } from '../types/Book';
import '../styles/BookMetadataEditor.css';

interface BookMetadataEditorProps {
  metadata: BookMetadata;
  onUpdate: (metadata: BookMetadata) => void;
}

export const BookMetadataEditor = ({ metadata, onUpdate }: BookMetadataEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BookMetadata>(metadata);

  const handleChange = (field: keyof BookMetadata, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            coverImage: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="book-metadata-editor">
      <button
        className="edit-button"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Cancelar' : 'Editar Capa e Info'}
      </button>

      {isEditing ? (
        <div className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Título do Livro:</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Digite o título"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor:</label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Digite o nome do autor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Digite uma descrição do livro"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Cor da Capa:</label>
            <input
              id="color"
              type="color"
              value={formData.coverColor}
              onChange={(e) => handleChange('coverColor', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagem da Capa:</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <button className="save-button" onClick={handleSave}>
            Salvar
          </button>
        </div>
      ) : (
        <div className="metadata-display">
          <div className="cover-preview" style={{ backgroundColor: metadata.coverColor }}>
            {metadata.coverImage ? (
              <img src={metadata.coverImage} alt="Capa" />
            ) : (
              <div className="empty-cover">Sem Capa</div>
            )}
          </div>
          <div className="info">
            <h2>{metadata.title}</h2>
            <p><strong>Autor:</strong> {metadata.author}</p>
            <p><strong>Descrição:</strong> {metadata.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
