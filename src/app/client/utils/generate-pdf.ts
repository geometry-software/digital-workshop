import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as moment from 'moment'
import { Log } from 'src/app/shared/repository/repository.model'
import { Client } from './client.model'

export const generatePdf = (editFormValue: Client, clientLog: Array<Log<Client>>): void => {
  const doc = new jsPDF('p', 'mm', 'a4')
  const header = [['Type', 'Brand', 'Model', 'Year', 'Plate']]
  const leftMargin = 15
  doc.setLineWidth(0.5)
  doc.setFontSize(14)
  doc.setTextColor(26, 82, 118)
  doc.setFont(undefined, 'bold')
  if (editFormValue.updated) {
    doc.text(`${editFormValue.status.toLocaleUpperCase()}, was edited ` + `${clientLog?.length} times`, leftMargin, 20)
  } else {
    doc.text(`${editFormValue.status.toLocaleUpperCase()}, no edit was applied`, leftMargin, 20)
  }
  doc.line(leftMargin, 25, 195, 25)
  doc.setTextColor(0, 0, 0)
  doc.setFont(undefined, 'normal')
  doc.text(`Name: ` + editFormValue.name, leftMargin, 35)
  doc.text(`Phone: ` + editFormValue.phone, leftMargin, 45)
  const timestamp = editFormValue.timestamp as any
  doc.text(`Created at: ` + moment(timestamp.toDate()).format('DD-MM-YYYY HH:mm:ss'), leftMargin, 55)
  const body = editFormValue.vehicles.map((el) => [el.type, el.brand.MakeName, el.model.Model_Name, el.year, el.plate])
  autoTable(doc, {
    head: header,
    body: body,
    startY: 60,
    headStyles: { fillColor: '#2874A6' },
  })
  if (editFormValue.updated) {
    clientLog.forEach((el) => {
      doc.setFontSize(14)
      doc.addPage('a4')
      doc.setTextColor(26, 82, 118)
      doc.setFont(undefined, 'bold')
      const updated = el.timestamp as any
      doc.text(`Updated at: ` + moment(updated.toDate()).format('DD-MM-YYYY HH:mm:ss'), leftMargin, 20).setFont(undefined, 'bold')
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, 'normal')
      doc.text(`Name: ` + el.item.name, leftMargin, 30)
      doc.text(`Phone: ` + el.item.phone, leftMargin, 40)
      doc.text(`Status: ` + el.item.status, leftMargin, 50)
      const body = el.item.vehicles.map((el) => [el.type, el.brand.MakeName, el.model.Model_Name, el.year, el.plate])
      autoTable(doc, {
        head: header,
        body: body,
        startY: 55,
        headStyles: { fillColor: '#85929E' },
      })
    })
  }
  doc.save(`${editFormValue.name}__${moment(new Date()).format('DD-MM-YYYY HH.mm.ss')}.pdf`)
}
