import React, { useState, useMemo, useCallback } from 'react';
import   styles  from './Table.module.scss';
import { classNames } from '../../../utils/classNames';


export interface Column<T = any> {
  /**
   * Clé unique pour la colonne
   */
  key: string;
  
  /**
   * Texte d'en-tête pour la colonne
   */
  header: string;
  
  /**
   * Fonction optionnelle de rendu personnalisé pour les cellules de cette colonne
   */
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T = any> {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Données à afficher dans le tableau
   */
  data: T[];

  /**
   * Configuration des colonnes
   */
  columns: Column<T>[];

  /**
   * Texte à afficher quand il n'y a pas de données
   */
  emptyText?: string;

  /**
   * Activer le tri des colonnes
   */
  enableSorting?: boolean;

  /**
   * Activer la pagination
   */
  enablePagination?: boolean;

  /**
   * Taille initiale de la page
   */
  initialPageSize?: number;

  /**
   * Options de taille de page disponibles
   */
  pageSizeOptions?: number[];

  /**
   * Contenu supplémentaire du tableau (facultatif)
   */
  children?: React.ReactNode;
}

export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    className,
    data,
    columns,
    emptyText = 'Aucune donnée disponible',
    enableSorting = false,
    enablePagination = false,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    children
  } = props;

  // État pour le tri
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending' | 'none';
  }>({ key: '', direction: 'none' });

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Fonction de tri
  const handleSort = useCallback((key: string) => {
    let direction: 'ascending' | 'descending' | 'none' = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
      }
    }
    
    setSortConfig({ key, direction });
  }, [sortConfig]);

  // Données triées
  const sortedData = useMemo(() => {
    if (sortConfig.direction === 'none' || !sortConfig.key) {
      return [...data];
    }

    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA < valB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valA > valB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Données paginées
  const paginatedData = useMemo(() => {
    if (!enablePagination) {
      return sortedData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, enablePagination]);

  // Gestion de la pagination
  const totalPages = useMemo(() => Math.ceil(sortedData.length / pageSize), [sortedData.length, pageSize]);
  
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Retour à la première page lors du changement de taille
  }, []);

  // Rendu de l'état vide
  if (data.length === 0 && emptyText) {
    return <div className={styles.emptyState}>{emptyText}</div>;
  }

  return (
    <div className={classNames(styles.tableContainer, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                onClick={enableSorting ? () => handleSort(column.key) : undefined}
                className={enableSorting ? styles.sortableHeader : ''}
                aria-sort={
                  sortConfig.key === column.key 
                    ? sortConfig.direction 
                    : 'none'
                }
              >
                {column.header}
                {enableSorting && sortConfig.key === column.key && sortConfig.direction !== 'none' && (
                  <span className={styles.sortIcon}>
                    {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`}>
                  {column.render 
                    ? column.render(row)
                    : row[column.key] !== undefined 
                      ? String(row[column.key]) 
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {enablePagination && data.length > 0 && (
        <div className={styles.pagination}>
          <div>
            <label>
              Lignes par page:
              <select 
                value={pageSize} 
                onChange={handlePageSizeChange}
                className={styles.pageSizeSelector}
              >
                {pageSizeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.pageControls}>
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Précédent
            </button>
            <span className={styles.pageInfo}>{currentPage} / {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default Table;
