import os

def generate_crud_xml(title, role_label, role_db_val, view_label):
    # Mapping coordinates
    # Lifelines: x=50 (Admin), x=250 (View), x=450 (Controller), x=650 (DB)
    # Centers: A=100, V=300, C=500, DB=700
    # Adjusted for Activation width=10 (starts at Center - 5)
    # V_bounds = 295 to 305
    # C_bounds = 495 to 505
    # DB_bounds = 695 to 705

    read_title = f"[ READ / Lihat Data {role_label} ]".replace("  ", " ")
    create_title = f"[ CREATE / Tambah {role_label} ]".replace("  ", " ")
    update_title = f"[ UPDATE / Ubah {role_label} ]".replace("  ", " ")
    delete_title = f"[ DELETE / Hapus {role_label} ]".replace("  ", " ")

    menu_name = f"Menu Data {role_label}" if role_label else "Menu Kelola Admin"
    get_path = f"/admin/{role_label.lower()}s" if role_label == "Guru" else ("/admin/parents" if role_label == "Orang Tua" else "/admin/users")
    db_read = f"SELECT * FROM users (role='{role_db_val}')" if role_db_val else "SELECT * FROM users"
    arr_ret = f"Return Array Data {role_label}" if role_label else "Return Array Data Users"
    view_ren = f"Render Halaman {role_label}" if role_label else "Render index.tsx"
    tab_show = f"Tampilkan Tabel Data {role_label}" if role_label else "Tampilkan Tabel Data Admin"
    
    pay_post = f"POST /admin/users (Payload {role_label})" if role_label else "POST /admin/users (Payload)"
    db_ins = f"INSERT INTO users (role='{role_db_val}')" if role_db_val else "INSERT INTO users"
    
    edit_lbl = f"Edit Form {role_label} & Update" if role_label else "Edit Form & Klik Update"

    xml = f"""<mxGraphModel dx="1200" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1450" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    
    <!-- Lifelines -->
    <mxCell id="LL_Admin" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fontStyle=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Admin&#10;(Pengelola)" vertex="1">
      <mxGeometry height="1350" width="100" x="50" y="50" as="geometry" />
    </mxCell>
    <mxCell id="LL_View" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fontStyle=1;fillColor=#d5e8d4;strokeColor=#82b366;" value="View&#10;({view_label})" vertex="1">
      <mxGeometry height="1350" width="100" x="250" y="50" as="geometry" />
    </mxCell>
    <mxCell id="LL_Controller" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fontStyle=1;fillColor=#ffe6cc;strokeColor=#d79b00;" value="Controller&#10;(UserController)" vertex="1">
      <mxGeometry height="1350" width="100" x="450" y="50" as="geometry" />
    </mxCell>
    <mxCell id="LL_DB" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fontStyle=1;fillColor=#f8cecc;strokeColor=#b85450;" value="Database&#10;(users)" vertex="1">
      <mxGeometry height="1350" width="100" x="650" y="50" as="geometry" />
    </mxCell>

    <!-- UML Alt Frame Utama -->
    <mxCell id="Alt_Frame" parent="1" style="shape=umlFrame;whiteSpace=wrap;html=1;width=60;height=30;boundedLbl=1;verticalAlign=middle;align=left;spacingLeft=5;fontStyle=1" value="Alt&#10;[{title}]" vertex="1">
      <mxGeometry height="1220" width="710" x="40" y="100" as="geometry" />
    </mxCell>

    <!-- Bagian 1: READ -->
    <mxCell id="Lbl_Read" parent="1" style="text;html=1;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontStyle=1" value="{read_title}" vertex="1">
      <mxGeometry height="30" width="200" x="50" y="110" as="geometry" />
    </mxCell>
    <mxCell id="Act_V_R" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="160" width="10" height="190" as="geometry" /></mxCell>
    <mxCell id="Act_C_R" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="200" width="10" height="120" as="geometry" /></mxCell>
    <mxCell id="Act_DB_R" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="240" width="10" height="40" as="geometry" /></mxCell>
    
    <mxCell id="M1" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="160" as="sourcePoint" /><mxPoint x="295" y="160" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L1" parent="M1" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="1. Klik {menu_name}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M2" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="200" as="sourcePoint" /><mxPoint x="495" y="200" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L2" parent="M2" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="2. GET {get_path}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M3" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="240" as="sourcePoint" /><mxPoint x="695" y="240" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L3" parent="M3" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="3. {db_read}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M4" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="280" as="sourcePoint" /><mxPoint x="505" y="280" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L4" parent="M4" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="4. {arr_ret}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M5" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="320" as="sourcePoint" /><mxPoint x="305" y="320" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L5" parent="M5" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="5. {view_ren}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M6" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="350" as="sourcePoint" /><mxPoint x="100" y="350" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L6" parent="M6" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="6. {tab_show}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="Div1" edge="1" parent="1" style="edgeStyle=none;html=1;dashed=1;endArrow=none;endFill=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="40" y="370" /><mxPoint x="750" y="370" /></mxGeometry></mxCell>

    <!-- Bagian 2: CREATE -->
    <mxCell id="Lbl_Create" parent="1" style="text;html=1;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontStyle=1" value="{create_title}" vertex="1">
      <mxGeometry height="30" width="200" x="50" y="380" as="geometry" />
    </mxCell>
    <mxCell id="Act_V_C" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="440" width="10" height="250" as="geometry" /></mxCell>
    <mxCell id="Act_C_C" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="480" width="10" height="170" as="geometry" /></mxCell>
    <mxCell id="Act_DB_C" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="570" width="10" height="40" as="geometry" /></mxCell>
    
    <mxCell id="M7" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="440" as="sourcePoint" /><mxPoint x="295" y="440" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L7" parent="M7" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="7. Isi Form Tambah &amp; Simpan" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M8" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="480" as="sourcePoint" /><mxPoint x="495" y="480" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L8" parent="M8" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="8. {pay_post}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M9" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;edgeStyle=orthogonalEdgeStyle;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="500" as="sourcePoint" /><mxPoint x="505" y="530" as="targetPoint" /><Array as="points"><mxPoint x="540" y="500" /><mxPoint x="540" y="530" /></Array></mxGeometry></mxCell>
    <mxCell id="L9" parent="M9" style="edgeLabel;html=1;align=left;verticalAlign=middle;" value="9. Validasi Input" vertex="1" connectable="0"><mxGeometry x="-0.1" relative="1" as="geometry"><mxPoint x="10" y="0" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M10" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="570" as="sourcePoint" /><mxPoint x="695" y="570" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L10" parent="M10" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="10. {db_ins}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M11" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="610" as="sourcePoint" /><mxPoint x="505" y="610" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L11" parent="M11" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="11. Success Response" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M12" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="650" as="sourcePoint" /><mxPoint x="305" y="650" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L12" parent="M12" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="12. Redirect to Index" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M13" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="690" as="sourcePoint" /><mxPoint x="100" y="690" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L13" parent="M13" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="13. Tampilkan Notifikasi Sukses" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="Div2" edge="1" parent="1" style="edgeStyle=none;html=1;dashed=1;endArrow=none;endFill=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="40" y="710" /><mxPoint x="750" y="710" /></mxGeometry></mxCell>

    <!-- Bagian 3: UPDATE -->
    <mxCell id="Lbl_Update" parent="1" style="text;html=1;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontStyle=1" value="{update_title}" vertex="1">
      <mxGeometry height="30" width="200" x="50" y="720" as="geometry" />
    </mxCell>
    <mxCell id="Act_V_U" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="770" width="10" height="250" as="geometry" /></mxCell>
    <mxCell id="Act_C_U" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="810" width="10" height="170" as="geometry" /></mxCell>
    <mxCell id="Act_DB_U" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="900" width="10" height="40" as="geometry" /></mxCell>

    <mxCell id="M14" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="770" as="sourcePoint" /><mxPoint x="295" y="770" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L14" parent="M14" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="14. {edit_lbl}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M15" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="810" as="sourcePoint" /><mxPoint x="495" y="810" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L15" parent="M15" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="15. PUT /admin/users/{{id}}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M16" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;edgeStyle=orthogonalEdgeStyle;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="830" as="sourcePoint" /><mxPoint x="505" y="860" as="targetPoint" /><Array as="points"><mxPoint x="540" y="830" /><mxPoint x="540" y="860" /></Array></mxGeometry></mxCell>
    <mxCell id="L16" parent="M16" style="edgeLabel;html=1;align=left;verticalAlign=middle;" value="16. Validasi Input" vertex="1" connectable="0"><mxGeometry x="-0.1" relative="1" as="geometry"><mxPoint x="10" y="0" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M17" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="900" as="sourcePoint" /><mxPoint x="695" y="900" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L17" parent="M17" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="17. UPDATE users SET ..." vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M18" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="940" as="sourcePoint" /><mxPoint x="505" y="940" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L18" parent="M18" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="18. Success Response" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M19" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="980" as="sourcePoint" /><mxPoint x="305" y="980" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L19" parent="M19" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="19. Redirect to Index" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M20" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="1020" as="sourcePoint" /><mxPoint x="100" y="1020" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L20" parent="M20" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="20. Tampilkan Notifikasi Update" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="Div3" edge="1" parent="1" style="edgeStyle=none;html=1;dashed=1;endArrow=none;endFill=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="40" y="1040" /><mxPoint x="750" y="1040" /></mxGeometry></mxCell>

    <!-- Bagian 4: DELETE -->
    <mxCell id="Lbl_Delete" parent="1" style="text;html=1;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontStyle=1" value="{delete_title}" vertex="1">
      <mxGeometry height="30" width="200" x="50" y="1050" as="geometry" />
    </mxCell>
    <mxCell id="Act_V_D" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="1100" width="10" height="200" as="geometry" /></mxCell>
    <mxCell id="Act_C_D" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="1140" width="10" height="120" as="geometry" /></mxCell>
    <mxCell id="Act_DB_D" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="1180" width="10" height="40" as="geometry" /></mxCell>

    <mxCell id="M21" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="1100" as="sourcePoint" /><mxPoint x="295" y="1100" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L21" parent="M21" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="21. Klik Hapus &amp; Konfirmasi" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M22" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="1140" as="sourcePoint" /><mxPoint x="495" y="1140" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L22" parent="M22" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="22. DELETE /admin/users/{{id}}" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M23" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="1180" as="sourcePoint" /><mxPoint x="695" y="1180" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L23" parent="M23" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="23. DELETE FROM users" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M24" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="1220" as="sourcePoint" /><mxPoint x="505" y="1220" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L24" parent="M24" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="24. Success Response" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M25" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="1260" as="sourcePoint" /><mxPoint x="305" y="1260" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L25" parent="M25" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="25. Redirect to Index" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M26" edge="1" parent="1" style="html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;rounded=0;fontStyle=0;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="1300" as="sourcePoint" /><mxPoint x="100" y="1300" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L26" parent="M26" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="26. Tampilkan Notifikasi Terhapus" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

  </root>
</mxGraphModel>
"""
    return xml

admin_xml = generate_crud_xml("CRUD Admin", "", "", "Halaman Admin")
guru_xml = generate_crud_xml("CRUD Guru", "Guru", "teacher", "Halaman Guru")
ortu_xml = generate_crud_xml("CRUD Orang Tua", "Orang Tua", "parent", "Halaman Orang Tua")

with open('/home/alislam/.gemini/antigravity-ide/brain/c88aac42-ee3b-41ed-83c2-4daf327d25a2/revised_sequence_xmls.md', 'w') as f:
    f.write("# Kumpulan XML Revisi (Dengan Activation Box dan Label Asli)\n\n")
    
    f.write("## 1. Mengelola Data Admin (Lengkap CRUD)\n")
    f.write("```xml\n" + admin_xml + "\n```\n\n")
    
    f.write("## 2. Mengelola Data Guru (Lengkap CRUD)\n")
    f.write("```xml\n" + guru_xml + "\n```\n\n")
    
    f.write("## 3. Mengelola Data Orang Tua Siswa (Lengkap CRUD)\n")
    f.write("```xml\n" + ortu_xml + "\n```\n\n")

print("Generated.")
