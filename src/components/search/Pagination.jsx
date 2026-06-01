import PropTypes from 'prop-types';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages =
    Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={
            currentPage === page
              ? 'active'
              : ''
          }
          onClick={() =>
            onPageChange(page)
          }
        >
          {page}
        </button>
      ))}

      <button
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
      >
        →
      </button>
    </div>
  );
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;