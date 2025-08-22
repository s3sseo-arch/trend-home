import jsPDF from 'jspdf';

export const generatePDF = async (configuration: any): Promise<Blob> => {
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(20);
  pdf.text('Window Configuration Order', 20, 30);
  
  // Add order details
  pdf.setFontSize(12);
  let yPosition = 50;
  
  const addLine = (label: string, value: string) => {
    pdf.text(`${label}: ${value}`, 20, yPosition);
    yPosition += 10;
  };
  
  addLine('Order Date', new Date().toLocaleDateString());
  addLine('Order Number', `WIN-${Date.now()}`);
  yPosition += 10;
  
  // Customer Information
  pdf.setFontSize(16);
  pdf.text('Customer Information', 20, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(12);
  addLine('Name', configuration.customerInfo?.name || 'Not provided');
  addLine('Email', configuration.customerInfo?.email || 'Not provided');
  addLine('Phone', configuration.customerInfo?.phone || 'Not provided');
  addLine('Address', configuration.customerInfo?.address || 'Not provided');
  yPosition += 10;
  
  // Configuration details
  pdf.setFontSize(16);
  pdf.text('Configuration Details', 20, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(12);
  addLine('Manufacturer', configuration.manufacturer || 'Not selected');
  addLine('Material', configuration.material?.toUpperCase() || 'Not selected');
  addLine('Window Type', configuration.windowType || 'Not selected');
  addLine('Dimensions', `${configuration.dimensions.width} × ${configuration.dimensions.height} mm`);
  addLine('Glass Type', configuration.glassType || 'Not selected');
  addLine('Interior Color', configuration.interiorColor || 'Not selected');
  addLine('Exterior Color', configuration.exteriorColor || 'Not selected');
  
  if (configuration.leftOpening) {
    addLine('Left Opening', configuration.leftOpening);
  }
  if (configuration.rightOpening) {
    addLine('Right Opening', configuration.rightOpening);
  }
  
  addLine('Roller Shutter', configuration.rollerShutter ? 'Yes' : 'No');
  if (configuration.rollerShutter) {
    addLine('Shutter Type', configuration.rollerShutterType || 'Not specified');
    addLine('Shutter Control', configuration.rollerShutterControl || 'Not specified');
  }
  
  addLine('Locking Option', configuration.lockingOption || 'Standard');
  
  if (configuration.topLight) addLine('Top Light', 'Yes');
  if (configuration.bottomLight) addLine('Bottom Light', 'Yes');
  if (configuration.sideLight?.left) addLine('Side Light Left', 'Yes');
  if (configuration.sideLight?.right) addLine('Side Light Right', 'Yes');
  
  yPosition += 10;
  
  // Add pricing section
  pdf.setFontSize(16);
  pdf.text('Price Estimate', 20, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(14);
  pdf.text('Total: Contact for final pricing', 20, yPosition);
  
  // Add footer
  pdf.setFontSize(10);
  pdf.text('This is an automated quote. Final pricing may vary.', 20, 280);
  
  return pdf.output('blob');
};