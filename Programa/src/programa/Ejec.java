package programa;


import java.awt.Color;
import java.util.Vector;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
/**
 *
 * @author USER
 */
public final class Ejec extends javax.swing.JFrame {
    DefaultTableModel m;
    DefaultTableModel aux;
    Vector<Object>listaAlgoritmos;
    ListaDoble listaDoble=new ListaDoble();
    int xMouse,yMouse;
    public Ejec() {
        initComponents();
        listaAlgoritmos=new Vector<Object>();
        tabla();
        tablaResultados();
        this.setLocationRelativeTo(null);
    }
    Fifo f=new Fifo(listaDoble);
    
     public void tabla(){
         String cabecera[]={"Proceso","Rafa CPU", "Tiempo de LLegada","Prioridad","Estado"};
         m=new DefaultTableModel(null,cabecera);
         tblProcesos.setModel(m);
         
     }
    /* public void bloqueo_cajas_texto(){
         txtProceso.setEnabled(false);
         txtRafaga.setEnabled(false);
         txtTiempo.setEnabled(false);
         txtPrioridad.setEnabled(false);
     }*/
     public void limpiar_cajas_texto(){
         txtTiempo.setText(null);
         txtProceso.setText(null);
         txtRafaga.setText(null);
         txtPrioridad.setText(null);
     }
     public void tablaResultados(){
         String cabecera[]={"Proceso","Tiempo Espera", "Tiempo Retorno","Tiempo de Respuesta","Estado"};
         aux=new DefaultTableModel(null,cabecera);
         tblResultados.setModel(aux);
     }
     
     int CPU;
     int tiempo;
     int prioridad;
     int numeroProcesos=0;
     
     void fifo(){
         
         CPU=Integer.parseInt(txtRafaga.getText());
         tiempo=Integer.parseInt(txtTiempo.getText());
         prioridad=Integer.parseInt(txtPrioridad.getText());
         String estado="Preparado";
         String Datos[]= new String[5];
         Datos[0]=txtProceso.getText();
         Datos[1]=String.valueOf(CPU);
         Datos[2]=String.valueOf(tiempo);
         Datos[3]=String.valueOf(prioridad);
         Datos[4]=String.valueOf(estado);
         m.addRow(Datos);
         Proceso p=new Proceso(txtProceso.getText(), CPU, tiempo, prioridad, estado);
         listaDoble.insertarPrincipio(p);
         jspGraficos.setViewportView(new Dibujos(listaDoble.size(), listaDoble));
     }

     
     public void tiempoProcesos_FIFO(){
        double t = 0;
        int tiempoespera=0;
        int tiemporespuesta=0;
        int tiemporetorno=0;
        String Datos[]= new String[5]; 
        for(int i=0;i<listaDoble.size();i++){
             
             Datos[0]=listaDoble.get(i).dato.getNombre();
             if(i==0){
                  tiempoespera+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo();
                  Datos[1]=String.valueOf(t);
                }else{
                    t=tiempoespera-listaDoble.get(i).dato.getTiempo();
                    tiempoespera+=listaDoble.get(i).dato.getRafaga();
                    Datos[1]=String.valueOf(t);
                }  
            if(i==0){
                  tiemporetorno+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo()+listaDoble.get(i).dato.getRafaga();
                  Datos[2]=String.valueOf(t);
                }else{
                    t=tiemporetorno+listaDoble.get(i).dato.getRafaga();
                    tiemporetorno+=listaDoble.get(i).dato.getRafaga();
                    Datos[2]=String.valueOf(t);
                }  
             if(i==0){
                  tiemporespuesta+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo();
                  t=t+listaDoble.get(i).dato.getRafaga();
                  Datos[3]=String.valueOf(t);
                }else{
                    t=tiemporespuesta-listaDoble.get(i).dato.getTiempo();
                    t=t+listaDoble.get(i).dato.getRafaga();
                    tiemporespuesta+=listaDoble.get(i).dato.getRafaga();
                    Datos[3]=String.valueOf(t);
                }   
             Datos[4]=String.valueOf("Procesado");
             aux.addRow(Datos);
          }
     }
     
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jspGraficos = new necesario.RSScrollPane();
        header = new javax.swing.JPanel();
        exitbtn = new javax.swing.JPanel();
        btnExitTxt = new javax.swing.JLabel();
        rSPanelGradiente3 = new rspanelgradiente.RSPanelGradiente();
        jLabel1 = new javax.swing.JLabel();
        lblTPE = new javax.swing.JLabel();
        lblTPRet = new javax.swing.JLabel();
        lblTPResp = new javax.swing.JLabel();
        btnAceptar = new rojeru_san.rsbutton.RSButtonGradiente();
        jLabel6 = new javax.swing.JLabel();
        txtProceso = new rojeru_san.rsfield.RSTextField();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        txtRafaga = new rojeru_san.rsfield.RSTextField();
        txtPrioridad = new rojeru_san.rsfield.RSTextField();
        txtTiempo = new rojeru_san.rsfield.RSTextField();
        jLabel4 = new javax.swing.JLabel();
        btnPreparar = new rojeru_san.rsbutton.RSButtonGradiente();
        btnResultado = new rojeru_san.rsbutton.RSButtonGradiente();
        jScrollPane4 = new javax.swing.JScrollPane();
        tblResultados = new rojeru_san.complementos.TableMetro();
        jScrollPane3 = new javax.swing.JScrollPane();
        tblProcesos = new rojeru_san.complementos.TableMetro();
        jLabel5 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setUndecorated(true);
        setResizable(false);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jspGraficos.setBackground(new java.awt.Color(204, 204, 204));
        jspGraficos.setViewportBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        jspGraficos.setColorBackground(new java.awt.Color(255, 255, 255));
        getContentPane().add(jspGraficos, new org.netbeans.lib.awtextra.AbsoluteConstraints(420, 50, 550, 190));

        header.setBackground(new java.awt.Color(255, 255, 255));
        header.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        header.addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            public void mouseDragged(java.awt.event.MouseEvent evt) {
                headerMouseDragged(evt);
            }
        });
        header.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                headerMousePressed(evt);
            }
        });

        exitbtn.setBackground(new java.awt.Color(255, 255, 255));
        exitbtn.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        exitbtn.setFont(new java.awt.Font("Roboto Light", 1, 24)); // NOI18N
        exitbtn.setMinimumSize(new java.awt.Dimension(46, 39));
        exitbtn.setPreferredSize(new java.awt.Dimension(39, 39));
        exitbtn.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        btnExitTxt.setFont(new java.awt.Font("Roboto Light", 0, 24)); // NOI18N
        btnExitTxt.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        btnExitTxt.setText("X");
        btnExitTxt.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        btnExitTxt.setPreferredSize(new java.awt.Dimension(40, 40));
        btnExitTxt.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnExitTxtMouseClicked(evt);
            }
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                btnExitTxtMouseEntered(evt);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                btnExitTxtMouseExited(evt);
            }
        });
        exitbtn.add(btnExitTxt, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 49, 38));

        javax.swing.GroupLayout headerLayout = new javax.swing.GroupLayout(header);
        header.setLayout(headerLayout);
        headerLayout.setHorizontalGroup(
            headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(headerLayout.createSequentialGroup()
                .addGap(939, 939, 939)
                .addComponent(exitbtn, javax.swing.GroupLayout.PREFERRED_SIZE, 49, javax.swing.GroupLayout.PREFERRED_SIZE))
        );
        headerLayout.setVerticalGroup(
            headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(exitbtn, javax.swing.GroupLayout.PREFERRED_SIZE, 38, javax.swing.GroupLayout.PREFERRED_SIZE)
        );

        getContentPane().add(header, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 990, 40));

        rSPanelGradiente3.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        rSPanelGradiente3.setColorPrimario(new java.awt.Color(102, 16, 141));
        rSPanelGradiente3.setColorSecundario(new java.awt.Color(0, 255, 255));
        rSPanelGradiente3.setGradiente(rspanelgradiente.RSPanelGradiente.Gradiente.CENTRAL);
        rSPanelGradiente3.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setFont(new java.awt.Font("Roboto Cn", 1, 24)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setText("Calculo");
        rSPanelGradiente3.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(70, 570, 170, 30));

        lblTPE.setForeground(new java.awt.Color(255, 255, 255));
        lblTPE.setBorder(javax.swing.BorderFactory.createTitledBorder(""));
        rSPanelGradiente3.add(lblTPE, new org.netbeans.lib.awtextra.AbsoluteConstraints(240, 580, 80, 20));

        lblTPRet.setForeground(new java.awt.Color(255, 255, 255));
        lblTPRet.setBorder(javax.swing.BorderFactory.createTitledBorder(""));
        rSPanelGradiente3.add(lblTPRet, new org.netbeans.lib.awtextra.AbsoluteConstraints(390, 580, 80, 20));

        lblTPResp.setForeground(new java.awt.Color(255, 255, 255));
        lblTPResp.setBorder(javax.swing.BorderFactory.createTitledBorder(""));
        rSPanelGradiente3.add(lblTPResp, new org.netbeans.lib.awtextra.AbsoluteConstraints(540, 580, 80, 20));

        btnAceptar.setText("Aceptar");
        btnAceptar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAceptarActionPerformed(evt);
            }
        });
        rSPanelGradiente3.add(btnAceptar, new org.netbeans.lib.awtextra.AbsoluteConstraints(650, 250, 90, 30));

        jLabel6.setFont(new java.awt.Font("Roboto Bk", 1, 24)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(255, 255, 255));
        jLabel6.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel6.setText("Proceso FIFO ");
        rSPanelGradiente3.add(jLabel6, new org.netbeans.lib.awtextra.AbsoluteConstraints(80, 50, 280, 60));

        txtProceso.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        txtProceso.setForeground(new java.awt.Color(0, 0, 0));
        txtProceso.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtProceso.setFont(new java.awt.Font("Roboto", 0, 14)); // NOI18N
        txtProceso.setPlaceholder("");
        txtProceso.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtProcesoActionPerformed(evt);
            }
        });
        rSPanelGradiente3.add(txtProceso, new org.netbeans.lib.awtextra.AbsoluteConstraints(100, 150, 100, 30));

        jLabel2.setFont(new java.awt.Font("Roboto", 0, 12)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("Proceso");
        rSPanelGradiente3.add(jLabel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 150, -1, -1));

        jLabel3.setFont(new java.awt.Font("Roboto", 0, 12)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(255, 255, 255));
        jLabel3.setText("Prioridad");
        rSPanelGradiente3.add(jLabel3, new org.netbeans.lib.awtextra.AbsoluteConstraints(240, 210, 50, -1));

        txtRafaga.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        txtRafaga.setForeground(new java.awt.Color(0, 0, 0));
        txtRafaga.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtRafaga.setFont(new java.awt.Font("Roboto", 0, 14)); // NOI18N
        txtRafaga.setPlaceholder("");
        txtRafaga.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtRafagaActionPerformed(evt);
            }
        });
        rSPanelGradiente3.add(txtRafaga, new org.netbeans.lib.awtextra.AbsoluteConstraints(100, 200, 100, 30));

        txtPrioridad.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        txtPrioridad.setForeground(new java.awt.Color(0, 0, 0));
        txtPrioridad.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtPrioridad.setFont(new java.awt.Font("Roboto", 0, 14)); // NOI18N
        txtPrioridad.setPlaceholder("");
        rSPanelGradiente3.add(txtPrioridad, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 200, 100, 30));

        txtTiempo.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        txtTiempo.setForeground(new java.awt.Color(0, 0, 0));
        txtTiempo.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtTiempo.setFont(new java.awt.Font("Roboto", 0, 14)); // NOI18N
        txtTiempo.setPlaceholder("");
        rSPanelGradiente3.add(txtTiempo, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 150, 100, 30));

        jLabel4.setFont(new java.awt.Font("Roboto", 0, 12)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(255, 255, 255));
        jLabel4.setText("T Llegada");
        rSPanelGradiente3.add(jLabel4, new org.netbeans.lib.awtextra.AbsoluteConstraints(240, 150, -1, -1));

        btnPreparar.setText("Preparar");
        btnPreparar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnPrepararActionPerformed(evt);
            }
        });
        rSPanelGradiente3.add(btnPreparar, new org.netbeans.lib.awtextra.AbsoluteConstraints(180, 250, 94, 30));

        btnResultado.setText("Resultado");
        btnResultado.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnResultadoActionPerformed(evt);
            }
        });
        rSPanelGradiente3.add(btnResultado, new org.netbeans.lib.awtextra.AbsoluteConstraints(350, 400, 110, 30));

        tblResultados.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        tblResultados.setColorFilasBackgound2(new java.awt.Color(255, 255, 255));
        tblResultados.setColorFilasForeground1(new java.awt.Color(87, 32, 204));
        tblResultados.setColorFilasForeground2(new java.awt.Color(87, 32, 204));
        tblResultados.setColorSelBackgound(new java.awt.Color(172, 153, 204));
        tblResultados.setFont(new java.awt.Font("Roboto Bk", 0, 11)); // NOI18N
        tblResultados.setFuenteFilas(new java.awt.Font("Roboto Bk", 1, 12)); // NOI18N
        tblResultados.setFuenteFilasSelect(new java.awt.Font("Roboto Bk", 1, 12)); // NOI18N
        tblResultados.setFuenteHead(new java.awt.Font("Roboto Bk", 1, 15)); // NOI18N
        jScrollPane4.setViewportView(tblResultados);

        rSPanelGradiente3.add(jScrollPane4, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 440, 780, 120));

        tblProcesos.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        tblProcesos.setColorFilasBackgound2(new java.awt.Color(255, 255, 255));
        tblProcesos.setColorFilasForeground1(new java.awt.Color(102, 16, 141));
        tblProcesos.setColorFilasForeground2(new java.awt.Color(102, 16, 141));
        tblProcesos.setColorSelBackgound(new java.awt.Color(172, 153, 204));
        tblProcesos.setFont(new java.awt.Font("Roboto Bk", 0, 11)); // NOI18N
        tblProcesos.setFuenteFilas(new java.awt.Font("Roboto Bk", 1, 12)); // NOI18N
        tblProcesos.setFuenteFilasSelect(new java.awt.Font("Roboto Bk", 1, 12)); // NOI18N
        tblProcesos.setFuenteHead(new java.awt.Font("Roboto Bk", 1, 15)); // NOI18N
        jScrollPane3.setViewportView(tblProcesos);

        rSPanelGradiente3.add(jScrollPane3, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 290, 780, 100));

        jLabel5.setFont(new java.awt.Font("Roboto", 0, 12)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setText("Rafaga");
        rSPanelGradiente3.add(jLabel5, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 210, -1, -1));

        getContentPane().add(rSPanelGradiente3, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 990, 630));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnPrepararActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnPrepararActionPerformed
      
            if((txtProceso.getText().equals(""))||(txtRafaga.getText().equals(""))||(txtTiempo.getText().equals(""))){
                JOptionPane.showMessageDialog(null, "Todos los campos son obligatorios");
            }else{
                fifo();
                limpiar_cajas_texto();
            }    
    }//GEN-LAST:event_btnPrepararActionPerformed

    private void btnResultadoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnResultadoActionPerformed
            tiempoProcesos_FIFO();
            Fifo f=new Fifo(listaDoble);
            f.FCSC();
            lblTPE.setText(String.valueOf(f.tiempoEspera()));
            lblTPRet.setText(String.valueOf(f.tiempoRetorno()));
            lblTPResp.setText(String.valueOf(f.tiempoRespuesta()));
    }//GEN-LAST:event_btnResultadoActionPerformed

    private void btnAceptarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAceptarActionPerformed
        Fifo f=new Fifo(listaDoble);
        f.FCSC();
        jspGraficos.setViewportView(new Hilos(listaDoble.size(), listaDoble));
    }//GEN-LAST:event_btnAceptarActionPerformed

    private void txtProcesoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtProcesoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtProcesoActionPerformed

    private void txtRafagaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtRafagaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtRafagaActionPerformed

    private void btnExitTxtMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnExitTxtMouseClicked
        System.exit(0);
    }//GEN-LAST:event_btnExitTxtMouseClicked

    private void btnExitTxtMouseEntered(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnExitTxtMouseEntered
        exitbtn.setBackground(Color.red);
        btnExitTxt.setForeground(Color.white);
    }//GEN-LAST:event_btnExitTxtMouseEntered

    private void btnExitTxtMouseExited(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnExitTxtMouseExited
        exitbtn.setBackground(Color.white);
        btnExitTxt.setForeground(Color.black);
    }//GEN-LAST:event_btnExitTxtMouseExited

    private void headerMouseDragged(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_headerMouseDragged
        int x = evt.getXOnScreen();
        int y = evt.getYOnScreen();
        this.setLocation(x - xMouse, y - yMouse);
    }//GEN-LAST:event_headerMouseDragged

    private void headerMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_headerMousePressed
        xMouse = evt.getX();
        yMouse = evt.getY();
    }//GEN-LAST:event_headerMousePressed
  
    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Ejec.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Ejec.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Ejec.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Ejec.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {

            public void run() {
                new Ejec().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private rojeru_san.rsbutton.RSButtonGradiente btnAceptar;
    private javax.swing.JLabel btnExitTxt;
    private rojeru_san.rsbutton.RSButtonGradiente btnPreparar;
    private rojeru_san.rsbutton.RSButtonGradiente btnResultado;
    private javax.swing.JPanel exitbtn;
    private javax.swing.JPanel header;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private necesario.RSScrollPane jspGraficos;
    private javax.swing.JLabel lblTPE;
    private javax.swing.JLabel lblTPResp;
    private javax.swing.JLabel lblTPRet;
    private rspanelgradiente.RSPanelGradiente rSPanelGradiente3;
    private rojeru_san.complementos.TableMetro tblProcesos;
    private rojeru_san.complementos.TableMetro tblResultados;
    private rojeru_san.rsfield.RSTextField txtPrioridad;
    private rojeru_san.rsfield.RSTextField txtProceso;
    private rojeru_san.rsfield.RSTextField txtRafaga;
    private rojeru_san.rsfield.RSTextField txtTiempo;
    // End of variables declaration//GEN-END:variables
}
