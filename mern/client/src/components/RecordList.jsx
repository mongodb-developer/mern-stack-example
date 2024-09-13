import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
	<tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
		<td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
			<input
			type="checkbox"
			role="checkbox"
			checked={props.isSelected}
			onChange={() => props.onSelect(props.record._id)}
			/>
		</td>
		<td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
			{props.record.name}
		</td>
		<td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
			{props.record.position}
		</td>
		<td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
			{props.record.level}
		</td>
		<td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
			<div className="flex gap-2">
				<Link
					className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
					to={`/edit/${props.record._id}`}
				>
					Edit
				</Link>
				<button
					className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
					color="red"
					type="button"
					onClick={() => {
						props.deleteRecord(props.record._id);
					}}
				>
					Delete
				</button>
			</div>
		</td>
	</tr>
);

export default function RecordList() {
	const [records, setRecords] = useState([]);
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [selectedRecords, setSelectedRecords] = useState(new Set());

	// This method fetches the records from the database.
	useEffect(() => {
		async function getRecords() {
			const response = await fetch(
				`http://localhost:5050/record?search=${debouncedSearch}`
			);
			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				console.error(message);
				return;
			}
			const records = await response.json();
			setRecords(records);
		}
		getRecords();
		return;
	}, [records.length, debouncedSearch]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);
		return () => clearTimeout(timeout);
	}, [search]);

	// This method will delete a record
	async function deleteRecord(id) {
		await fetch(`http://localhost:5050/record/${id}`, {
			method: "DELETE",
		});
		const newRecords = records.filter((el) => el._id !== id);
		setRecords(newRecords);
	}

	// This method will delete multiple records
	async function bulkDeleteRecord() {
        const idsToDelete = Array.from(selectedRecords);
        await fetch(`http://localhost:5050/record/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: idsToDelete }),
        });
        setRecords(records.filter((record) => !idsToDelete.includes(record._id)));
        setSelectedRecords(new Set());
    }

    function handleSelect(id) {
        setSelectedRecords((prev) => {
            const newSelection = new Set(prev);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            return newSelection;
        });
    }

	// This method will map out the records on the table
	function recordList() {
		return records.map((record) => {
			return (
				<Record
					record={record}
					deleteRecord={() => deleteRecord(record._id)}
					isSelected={selectedRecords.has(record._id)}
                	onSelect={handleSelect}
					key={record._id}
				/>
			);
		});
	}

	// This following section will display the table with the records of individuals.
	return (
		<>
			<h3 className="text-lg font-semibold p-4">Employee Records</h3>
			<div className="flex justify-between p-4">
				<input
					className="w-1/2 p-2 border rounded-md"
					type="text"
					placeholder="Search"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					class="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform active:scale-95"
					onClick={bulkDeleteRecord}
					disabled={selectedRecords.size === 0}>
					Delete
				</button>
			</div>
			<div className="border rounded-lg overflow-hidden">
				<div className="relative w-full overflow-auto">
					<table className="w-full caption-bottom text-sm">
						<thead className="[&amp;_tr]:border-b">
							<tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
									<input
                                        type="checkbox"
                                        checked={records.length > 0 && records.every(record => selectedRecords.has(record._id))}
                                        onChange={() => {
                                            if (records.length > 0 && records.every(record => selectedRecords.has(record._id))) {
                                                setSelectedRecords(new Set());
                                            } else {
                                                setSelectedRecords(new Set(records.map(record => record._id)));
                                            }
                                        }}
                                    />
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
									Name
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
									Position
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
									Level
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="[&amp;_tr:last-child]:border-0">
							{recordList()}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
