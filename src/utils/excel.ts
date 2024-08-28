import { utils, writeFileXLSX } from 'xlsx';
/* get state data and export to XLSX */
export function exportFile(
  jsonData: Record<string, any>[],
  filename: string,
) {
  /* generate worksheet from state */
  const ws = utils.json_to_sheet(jsonData);
  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  /* export to XLSX */
  writeFileXLSX(wb, filename);
}
