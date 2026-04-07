import { useState, useEffect } from 'react';
import type { Book, BookPage, BookMetadata } from './types/Book';
import { BookMetadataEditor } from './components/BookMetadataEditor';
import { BookPageEditor } from './components/BookPageEditor';
import { BookViewer } from './components/BookViewer';
import { useTheme } from './context/ThemeContext';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [book, setBook] = useState<Book>(() => {
    const stored = localStorage.getItem('currentBook');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      id: 'book-' + Date.now(),
      title: 'Meu Livro Incrível',
      author: 'Seu Nome',
      description: 'Uma descrição do meu livro',
      coverColor: '#8B4513',
      coverImage: '',
      pages: [
        {
          id: 'page-1',
          content: 'Bem-vindo ao seu livro!\n\nEste é um exemplo de página. Você pode editar este conteúdo clicando em "Editar Página" no painel da esquerda.\n\nComece a criar seu livro agora!',
          pageNumber: 1,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Salvar livro no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('currentBook', JSON.stringify(book));
  }, [book]);

  const handleMetadataUpdate = (metadata: BookMetadata) => {
    setBook(prev => ({
      ...prev,
      ...metadata,
      updatedAt: new Date(),
    }));
  };

  const handlePageContentUpdate = (index: number, content: string) => {
    setBook(prev => {
      const newPages = [...prev.pages];
      newPages[index] = { ...newPages[index], content };
      return {
        ...prev,
        pages: newPages,
        updatedAt: new Date(),
      };
    });
  };

  const handlePageImageUpdate = (index: number, image: string, position: string) => {
    setBook(prev => {
      const newPages = [...prev.pages];
      newPages[index] = { 
        ...newPages[index], 
        image,
        imagePosition: position as 'top' | 'center' | 'bottom' | 'full'
      };
      return {
        ...prev,
        pages: newPages,
        updatedAt: new Date(),
      };
    });
  };

  const handlePageImageRemove = (index: number) => {
    setBook(prev => {
      const newPages = [...prev.pages];
      newPages[index] = { 
        ...newPages[index], 
        image: undefined,
        imagePosition: undefined
      };
      return {
        ...prev,
        pages: newPages,
        updatedAt: new Date(),
      };
    });
  };

  const handleAddPage = () => {
    const newPage: BookPage = {
      id: 'page-' + Date.now(),
      content: 'Nova página',
      pageNumber: book.pages.length + 1,
    };
    setBook(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      updatedAt: new Date(),
    }));
    setCurrentPageIndex(book.pages.length);
  };

  const handleDeletePage = (index: number) => {
    setBook(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index).map((page, i) => ({
        ...page,
        pageNumber: i + 1,
      })),
      updatedAt: new Date(),
    }));
    if (currentPageIndex >= book.pages.length - 1) {
      setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
    }
  };

  const handleExportBook = () => {
    const dataStr = JSON.stringify(book, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportToPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Criar um elemento invisível para renderizar o livro como PDF
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.backgroundColor = 'white';
    element.style.fontFamily = 'Arial, sans-serif';
    
    // Adicionar a capa
    const coverDiv = document.createElement('div');
    coverDiv.style.pageBreakAfter = 'always';
    coverDiv.style.padding = '60px 40px';
    coverDiv.style.textAlign = 'center';
    coverDiv.style.minHeight = '100vh';
    coverDiv.style.display = 'flex';
    coverDiv.style.flexDirection = 'column';
    coverDiv.style.justifyContent = 'center';
    coverDiv.style.alignItems = 'center';
    coverDiv.style.backgroundColor = book.coverColor;
    coverDiv.style.color = 'white';
    
    if (book.coverImage) {
      const img = document.createElement('img');
      img.src = book.coverImage;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '60vh';
      img.style.marginBottom = '30px';
      img.style.objectFit = 'contain';
      coverDiv.appendChild(img);
    }
    
    const title = document.createElement('h1');
    title.textContent = book.title;
    title.style.fontSize = '48px';
    title.style.marginBottom = '20px';
    title.style.fontWeight = 'bold';
    coverDiv.appendChild(title);
    
    const author = document.createElement('p');
    author.textContent = `Por: ${book.author}`;
    author.style.fontSize = '20px';
    author.style.marginBottom = '10px';
    coverDiv.appendChild(author);
    
    const desc = document.createElement('p');
    desc.textContent = book.description;
    desc.style.fontSize = '16px';
    desc.style.fontStyle = 'italic';
    coverDiv.appendChild(desc);
    
    element.appendChild(coverDiv);
    
    // Adicionar cada página
    book.pages.forEach((page) => {
      const pageDiv = document.createElement('div');
      pageDiv.style.pageBreakAfter = 'always';
      pageDiv.style.padding = '40px';
      pageDiv.style.minHeight = '100vh';
      pageDiv.style.fontSize = '14px';
      pageDiv.style.lineHeight = '1.6';
      
      // Adicionar número da página
      const pageNum = document.createElement('div');
      pageNum.textContent = `Página ${page.pageNumber}`;
      pageNum.style.fontSize = '12px';
      pageNum.style.color = '#999';
      pageNum.style.marginBottom = '20px';
      pageDiv.appendChild(pageNum);
      
      // Adicionar imagem se existir
      if (page.image) {
        const imgContainer = document.createElement('div');
        imgContainer.style.marginBottom = '20px';
        imgContainer.style.textAlign = 'center';
        
        const img = document.createElement('img');
        img.src = page.image;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '400px';
        img.style.objectFit = 'contain';
        imgContainer.appendChild(img);
        
        pageDiv.appendChild(imgContainer);
      }
      
      // Adicionar conteúdo de texto
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = page.content.split('\n').map(line => 
        line.trim() ? `<p>${line}</p>` : '<p>&nbsp;</p>'
      ).join('');
      pageDiv.appendChild(contentDiv);
      
      element.appendChild(pageDiv);
    });
    
    // Gerar PDF
    const opt = {
      margin: 0,
      filename: `${book.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const handleImportBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedBook = JSON.parse(event.target?.result as string);
          setBook({
            ...importedBook,
            id: importedBook.id || 'book-' + Date.now(),
            createdAt: new Date(importedBook.createdAt),
            updatedAt: new Date(),
          });
          setCurrentPageIndex(0);
          alert('Livro importado com sucesso!');
        } catch (error) {
          alert('Erro ao importar livro: ' + error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleNewBook = () => {
    if (window.confirm('Tem certeza que quer criar um novo livro? O livro atual será perdido se não foi salvo.')) {
      const newBook: Book = {
        id: 'book-' + Date.now(),
        title: 'Novo Livro',
        author: 'Seu Nome',
        description: 'Uma descrição do livro',
        coverColor: '#8B4513',
        coverImage: '',
        pages: [
          {
            id: 'page-1',
            content: 'Comece a escrever aqui...',
            pageNumber: 1,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBook(newBook);
      setCurrentPageIndex(0);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>📚 Criador de Livros</h1>
          <button 
            className="theme-toggle-button"
            onClick={toggleTheme}
            title="Alternar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="header-controls">
          <button
            className={`mode-button ${mode === 'edit' ? 'active' : ''}`}
            onClick={() => setMode('edit')}
          >
            ✏️ Editar
          </button>
          <button
            className={`mode-button ${mode === 'view' ? 'active' : ''}`}
            onClick={() => setMode('view')}
          >
            👁️ Visualizar
          </button>
          <div className="file-controls">
            <button onClick={handleNewBook} className="control-button">
              📄 Novo Livro
            </button>
            <button onClick={handleExportBook} className="control-button">
              💾 Exportar
            </button>
            <button onClick={handleExportToPDF} className="control-button">
              📕 Exportar PDF
            </button>
            <label className="control-button file-input-label">
              📂 Importar
              <input
                type="file"
                accept=".json"
                onChange={handleImportBook}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </header>

      <main className="app-main">
        {mode === 'edit' ? (
          <div className="edit-layout">
            <div className="edit-sidebar">
              <BookMetadataEditor
                metadata={{
                  title: book.title,
                  author: book.author,
                  description: book.description,
                  coverImage: book.coverImage,
                  coverColor: book.coverColor,
                }}
                onUpdate={handleMetadataUpdate}
              />
            </div>
            <div className="edit-content">
              <BookPageEditor
                pages={book.pages}
                currentPageIndex={currentPageIndex}
                onPageChange={setCurrentPageIndex}
                onPageContentUpdate={handlePageContentUpdate}
                onPageImageUpdate={handlePageImageUpdate}
                onPageImageRemove={handlePageImageRemove}
                onAddPage={handleAddPage}
                onDeletePage={handleDeletePage}
              />
            </div>
          </div>
        ) : (
          <div className="view-layout">
            <BookViewer book={book} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Criador de Livros © 2024 - Crie seus livros digitais com facilidade!</p>
      </footer>
    </div>
  );
}

export default App;
