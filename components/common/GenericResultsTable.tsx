import Link from "next/link";

export interface TableColumn<T> {
    label: string;
    field: keyof T;
    type: "text" | "link" | "button";
    /** Function to render custom cell content */
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    /** URL builder for link/button types */
    getUrl?: (row: T) => string;
}

export interface GenericResultsTableProps<T extends { id: string | number }> {
    data: T[];
    columns: TableColumn<T>[];
    /** Field to use as the unique key for each row */
    keyField: keyof T;
    /** Optional: render content for first column (row number, location, etc) */
    renderRowHeader?: (row: T, index: number) => React.ReactNode;
    /** Base URL for detail links */
    detailBaseUrl?: string;
}

export function GenericResultsTable<T extends { id: string | number }>({
    data,
    columns,
    keyField,
    renderRowHeader,
    detailBaseUrl,
}: GenericResultsTableProps<T>) {
    const renderCell = (column: TableColumn<T>, row: T) => {
        const value = row[column.field];
        const stringValue = value != null ? String(value) : "";

        // Custom render function takes priority
        if (column.render) {
            return column.render(value, row);
        }

        // Button type
        if (column.type === "button" && stringValue) {
            const url = column.getUrl ? column.getUrl(row) : stringValue;
            return (
                <Link href={url} target="_blank" className="btn btn-primary btn-sm">
                    {column.label}
                </Link>
            );
        }

        // Link type (links to detail page)
        if (column.type === "link" && detailBaseUrl) {
            return (
                <Link href={`${detailBaseUrl}/${row[keyField]}`} className="link link-primary">
                    {stringValue}
                </Link>
            );
        }

        // Default: text
        return <>{stringValue}</>;
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((col) => (
                            <th key={String(col.field)}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={String(row[keyField])}>
                            <th>
                                {renderRowHeader ? renderRowHeader(row, index) : index + 1}
                            </th>
                            {columns.map((col) => (
                                <td key={String(col.field)}>{renderCell(col, row)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GenericResultsTable;
