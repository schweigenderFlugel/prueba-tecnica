import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  body: {
    fontSize: 12,
    margin: [0, 0, 0, 50],
    alignment: 'justify',
  },
};

export default function getInfoDocument(data: { [key: string]: string }): TDocumentDefinitions {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    pageSize: 'A4',
    content: [
      ...keys.map((key, keyIndex) => [
        ...values.map((value, valueIndex) => [
          {
            text: keyIndex === valueIndex ? `${key}: ${value}` : '',
          },
        ]),
      ]),
    ],
  };
}
