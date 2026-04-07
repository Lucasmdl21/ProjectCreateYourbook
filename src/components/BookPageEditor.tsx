import type { BookPage } from '../types/Book';
import '../styles/BookPageEditor.css';

interface BookPageEditorProps {
  pages: BookPage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  onPageContentUpdate: (index: number, content: string) => void;
  onPageImageUpdate: (index: number, image: string, position: string) => void;
  onPageImageRemove: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
}

export const BookPageEditor = ({
  pages,
  currentPageIndex,
  onPageChange,
  onPageContentUpdate,
  onPageImageUpdate,
  onPageImageRemove,
  onAddPage,
  onDeletePage,
}: BookPageEditorProps) => {
  const currentPage = pages[currentPageIndex];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const position = currentPage.imagePosition || 'center';
          onPageImageUpdate(currentPageIndex, event.target!.result as string, position);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagePositionChange = (position: string) => {
    if (currentPage.image) {
      onPageImageUpdate(currentPageIndex, currentPage.image, position);
    }
  };

  return (
    <div className="book-page-editor">
      <div className="page-list">
        <h3>Páginas ({pages.length})</h3>
        <div className="pages-scroll">
          {pages.map((page, index) => (
            <div
              key={page.id}
              className={`page-item ${index === currentPageIndex ? 'active' : ''}`}
              onClick={() => onPageChange(index)}
            >
              <span className="page-number">Pág. {page.pageNumber}</span>
              <span className="page-preview">
                {page.content.substring(0, 30)}...
              </span>
            </div>
          ))}
        </div>
        <button className="add-page-btn" onClick={onAddPage}>
          + Adicionar Página
        </button>
      </div>

      {currentPage && (
        <div className="editor-section">
          <div className="editor-header">
            <h3>Página {currentPage.pageNumber}</h3>
            <button
              className="delete-btn"
              onClick={() => {
                if (pages.length > 1) {
                  onDeletePage(currentPageIndex);
                } else {
                  alert('Você precisa ter pelo menos uma página!');
                }
              }}
            >
              Deletar Página
            </button>
          </div>

          {/* Seção de Imagem */}
          <div className="image-section">
            <h4>🖼️ Imagem da Página</h4>
            {currentPage.image ? (
              <div className="image-preview">
                <img src={currentPage.image} alt="Imagem da página" />
                <div className="image-controls">
                  <div className="position-controls">
                    <label>Posição:</label>
                    <select 
                      value={currentPage.imagePosition || 'center'}
                      onChange={(e) => handleImagePositionChange(e.target.value)}
                    >
                      <option value="top">Topo</option>
                      <option value="center">Centro</option>
                      <option value="bottom">Rodapé</option>
                      <option value="full">Tela Cheia</option>
                    </select>
                  </div>
                  <button 
                    className="remove-image-btn"
                    onClick={() => onPageImageRemove(currentPageIndex)}
                  >
                    ✕ Remover Imagem
                  </button>
                </div>
              </div>
            ) : (
              <label className="image-upload-label">
                + Adicionar Imagem
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>

          {/* Seção de Conteúdo */}
          <div className="content-section">
            <h4>📝 Conteúdo de Texto</h4>
            <textarea
              className="page-content-editor"
              value={currentPage.content}
              onChange={(e) => onPageContentUpdate(currentPageIndex, e.target.value)}
              placeholder="Digite o conteúdo da página aqui..."
            />
            <div className="char-count">
              Caracteres: {currentPage.content.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
