import { useState } from 'react';
import type { Book } from '../types/Book';
import '../styles/BookViewer.css';

interface BookViewerProps {
  book: Book;
}

export const BookViewer = ({ book }: BookViewerProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = book.pages.length;
  
  // Determina quais páginas mostrar lado a lado
  const leftPageIndex = currentPageIndex % 2 === 0 ? currentPageIndex : currentPageIndex - 1;
  const rightPageIndex = leftPageIndex + 1;
  
  const leftPage = book.pages[leftPageIndex] || null;
  const rightPage = book.pages[rightPageIndex] || null;
  
  const isFirstPage = leftPageIndex === 0;
  const isLastPage = rightPageIndex >= totalPages;

  const handlePrevious = () => {
    if (currentPageIndex >= 2) {
      setCurrentPageIndex(currentPageIndex - 2);
    }
  };

  const handleNext = () => {
    if (rightPageIndex < totalPages) {
      setCurrentPageIndex(currentPageIndex + 2);
    }
  };

  const handleCoverToFirstPage = () => {
    setCurrentPageIndex(0);
  };

  return (
    <div className="book-viewer">
      <div className="book-display">
        <div className="book-container">
          {/* Página da Esquerda - Capa ou Página */}
          <div className="page left-page">
            {leftPageIndex === -1 ? (
              <div className="book-cover" style={{ backgroundColor: book.coverColor }}>
                {book.coverImage && (
                  <img src={book.coverImage} alt="Capa do Livro" className="cover-image" />
                )}
                <div className="cover-text">
                  <h1>{book.title}</h1>
                  <p className="author">{book.author}</p>
                  <p className="description">{book.description}</p>
                </div>
              </div>
            ) : leftPage ? (
              <div className="page-content">
                <div className="page-header">
                  <span className="page-number">Pág. {leftPage.pageNumber}</span>
                </div>
                {leftPage.image && leftPage.imagePosition === 'top' && (
                  <div className="page-image-container top">
                    <img src={leftPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
                {leftPage.image && leftPage.imagePosition === 'full' && (
                  <div className="page-image-container full">
                    <img src={leftPage.image} alt="Imagem da página" className="page-image-full" />
                  </div>
                )}
                {leftPage.image && leftPage.imagePosition === 'center' && (
                  <div className="page-image-container center">
                    <img src={leftPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
                <div className="page-text">
                  {leftPage.content.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                {leftPage.image && leftPage.imagePosition === 'bottom' && (
                  <div className="page-image-container bottom">
                    <img src={leftPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Página da Direita */}
          <div className="page right-page">
            {rightPage ? (
              <div className="page-content">
                <div className="page-header">
                  <span className="page-number">Pág. {rightPage.pageNumber}</span>
                </div>
                {rightPage.image && rightPage.imagePosition === 'top' && (
                  <div className="page-image-container top">
                    <img src={rightPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
                {rightPage.image && rightPage.imagePosition === 'full' && (
                  <div className="page-image-container full">
                    <img src={rightPage.image} alt="Imagem da página" className="page-image-full" />
                  </div>
                )}
                {rightPage.image && rightPage.imagePosition === 'center' && (
                  <div className="page-image-container center">
                    <img src={rightPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
                <div className="page-text">
                  {rightPage.content.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                {rightPage.image && rightPage.imagePosition === 'bottom' && (
                  <div className="page-image-container bottom">
                    <img src={rightPage.image} alt="Imagem da página" className="page-image" />
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-page">
                {isLastPage && rightPageIndex > totalPages ? (
                  <div className="end-message">Fim do Livro</div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="viewer-controls">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={isFirstPage}
        >
          ← Página Anterior
        </button>

        <div className="page-indicator">
          <span>
            {leftPageIndex === -1 ? 'Capa' : `Pág. ${leftPageIndex + 1}`}
            {rightPage ? ` - ${rightPageIndex + 1}` : ''}
          </span>
          <span> / {totalPages + 1} páginas</span>
        </div>

        <button
          className="nav-button"
          onClick={handleNext}
          disabled={isLastPage}
        >
          Próxima Página →
        </button>
      </div>

      {/* Links para Saltar */}
      <div className="jump-controls">
        <button 
          className="jump-button"
          onClick={handleCoverToFirstPage}
        >
          Ir para Capa
        </button>
        <input
          type="range"
          min="-1"
          max={totalPages - 1}
          value={leftPageIndex}
          onChange={(e) => setCurrentPageIndex(parseInt(e.target.value))}
          className="page-slider"
        />
      </div>
    </div>
  );
};
