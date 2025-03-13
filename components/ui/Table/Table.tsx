'use client';

import React, { useState, useMemo } from 'react';
import styles from './Table.module.scss';

export interface Column<T> {
  /**
   * Clé unique pour identifier la colonne, doit correspondre à une clé dans les données
   */
  key: keyof T;

  /**
   * Libellé d'en-tête de la colonne
   */
  header: string;

  /**
   * Fonction de rendu personnalisé pour le contenu de la cellule
   * @param row - Données de la ligne courante
   * @returns - Élément React à afficher dans la cellule
   */
  render?: (row: T) => React.ReactNode;

  /**
   * Indique si le tri est désactivé pour cette colonne
   */
  disableSortBy?: boolean;
}

export interface TableProps<T> {
  /**
   * Données du tableau, un tableau d'objets
   */
  data: T[];

  /**
   * Configuration des colonnes du tableau
   */
  columns: Column<T>[];

  /**
   * Texte à afficher quand il n'y a pas de données
   */
  emptyText?: string;

  /**
   * Indique si le tri par colonne est activé
   */
  enableSorting?: boolean;

  /**
   * Indique si la pagination est activée
   */
  enablePagination?: boolean;

  /**
   * Nombre initial de lignes par page
   */
  initialPageSize?: number;

  /**
   * Options pour le nombre de lignes par page
   */
  pageSizeOptions?: number[];

  /**
   * Classes CSS additionnelles pour le conteneur du tableau
   */
  className?: string;

  /**
   * Classes CSS additionnelles pour le tableau
   */
  tableClassName?: string;
}

/**
 * Composant Table pour afficher des données tabulaires avec tri et pagination optionnels
 *
 * @param data - Données du tableau (tableau d'objets)
 * @param columns - Configuration des colonnes
 * @param emptyText - Texte si pas de données
 * @param enableSorting - Active/désactive le tri
 * @param enablePagination - Active/désactive la pagination
 * @param initialPageSize - Nombre initial de lignes par page
 * @param pageSizeOptions - Options de taille de page
 * @param className - Classes CSS conteneur
 * @param tableClassName - Classes CSS tableau
 */
const Table = <T extends Record<string, any>>({
  data,
  columns,
  emptyText = 'Aucune donnée à afficher',
  enableSorting = true,
  enablePagination = false,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
  tableClassName = '',
}: TableProps<T>) => {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Données triées (mémoïsées pour performance)
  const sortedData = useMemo(() => {
    if (!enableSorting || !sortBy) {
      return data;
    }

    const direction = sortDirection === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) {
        return -direction;
      }

      if (valueA > valueB) {
        return direction;
      }

      return 0;
    });
  }, [data, sortBy, sortDirection, enableSorting]);

  // Gestion du tri
  const handleSort = (columnKey: keyof T) => {
    if (!enableSorting || columns.find((col) => col.key === columnKey)?.disableSortBy) {
      return;
    }

    if (sortBy === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortDirection('asc');
    }
  };

  // Pagination
  const pageCount = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (!enablePagination) {
      return sortedData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, enablePagination]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Retourne à la première page après changement de taille
  };

  const renderSortIcon = (columnKey: keyof T) => {
    if (sortBy === columnKey) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }

    return null;
  };

  if (data.length === 0) {
    return <div className={className}>{emptyText}</div>;
  }

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={`${styles.table} ${tableClassName}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={styles.headerCell}
                onClick={() => handleSort(column.key)}
                aria-sort={sortBy === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {column.header}
                {enableSorting && !column.disableSortBy && renderSortIcon(column.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className={styles.row}>
              {columns.map((column) => (
                <td key={String(column.key)} className={styles.cell}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {enablePagination && (
        <div className={styles.pagination}>
          <div className={styles.pageSizeSelector}>
            <label htmlFor="pageSize">Lignes par page:</label>
            <select id="pageSize" value={pageSize} onChange={(e) => changePageSize(Number(e.target.value))}>
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.pageButtons}>
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
              Précédent
            </button>
            <span>
              {currentPage} / {pageCount}
            </span>
            <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
