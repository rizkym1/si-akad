import os

login_xml = """<mxGraphModel dx="1200" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="600" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="LL_User" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="User" vertex="1"><mxGeometry height="500" width="100" x="50" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_View" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#d5e8d4;strokeColor=#82b366;" value="View" vertex="1"><mxGeometry height="500" width="100" x="250" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_Controller" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#ffe6cc;strokeColor=#d79b00;" value="AuthController" vertex="1"><mxGeometry height="500" width="100" x="450" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_DB" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8cecc;strokeColor=#b85450;" value="Database" vertex="1"><mxGeometry height="500" width="100" x="650" y="50" as="geometry" /></mxCell>

    <!-- Activations -->
    <mxCell id="Act_View" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="120" width="10" height="300" as="geometry" /></mxCell>
    <mxCell id="Act_Ctrl" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="160" width="10" height="220" as="geometry" /></mxCell>
    <mxCell id="Act_DB" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="200" width="10" height="40" as="geometry" /></mxCell>

    <!-- Messages -->
    <mxCell id="M1" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="120" as="sourcePoint" /><mxPoint x="295" y="120" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L1" parent="M1" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="1. Input Kredensial &amp; Login" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M2" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="160" as="sourcePoint" /><mxPoint x="495" y="160" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L2" parent="M2" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="2. POST /login" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M3" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="200" as="sourcePoint" /><mxPoint x="695" y="200" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L3" parent="M3" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="3. SELECT user by email" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M4" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="240" as="sourcePoint" /><mxPoint x="505" y="240" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L4" parent="M4" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="4. Return User Data" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="Alt_Frame" parent="1" style="shape=umlFrame;whiteSpace=wrap;html=1;width=40;height=20;boundedLbl=1;fontStyle=1" value="Alt" vertex="1"><mxGeometry height="160" width="450" x="75" y="260" as="geometry" /></mxCell>
    <mxCell id="Div" edge="1" parent="1" style="edgeStyle=none;html=1;dashed=1;endArrow=none;"><mxGeometry relative="1" as="geometry"><mxPoint x="75" y="340" /><mxPoint x="525" y="340" /></mxGeometry></mxCell>

    <mxCell id="M5" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="290" as="sourcePoint" /><mxPoint x="305" y="290" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L5" parent="M5" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="5. Redirect Back (Error)" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M6" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="330" as="sourcePoint" /><mxPoint x="100" y="330" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L6" parent="M6" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="6. Tampilkan Pesan Error" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M7" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="380" as="sourcePoint" /><mxPoint x="305" y="380" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L7" parent="M7" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="7. Redirect /dashboard" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M8" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="420" as="sourcePoint" /><mxPoint x="100" y="420" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L8" parent="M8" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="8. Tampilkan Dashboard" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>
  </root>
</mxGraphModel>"""

siswa_xml = """<mxGraphModel dx="1200" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="700" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    
    <mxCell id="LL_Admin" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Admin" vertex="1"><mxGeometry height="650" width="100" x="50" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_View" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#d5e8d4;strokeColor=#82b366;" value="View" vertex="1"><mxGeometry height="650" width="100" x="250" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_Controller" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#ffe6cc;strokeColor=#d79b00;" value="StudentController" vertex="1"><mxGeometry height="650" width="100" x="450" y="50" as="geometry" /></mxCell>
    <mxCell id="LL_DB" parent="1" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8cecc;strokeColor=#b85450;" value="Database" vertex="1"><mxGeometry height="650" width="100" x="650" y="50" as="geometry" /></mxCell>

    <!-- Activations -->
    <mxCell id="Act_View" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="295" y="120" width="10" height="430" as="geometry" /></mxCell>
    <mxCell id="Act_Ctrl" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="495" y="160" width="10" height="340" as="geometry" /></mxCell>
    <mxCell id="Act_DB" parent="1" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#ffffff;" vertex="1"><mxGeometry x="695" y="410" width="10" height="40" as="geometry" /></mxCell>

    <!-- Messages -->
    <mxCell id="M1" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="120" as="sourcePoint" /><mxPoint x="295" y="120" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L1" parent="M1" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="1. Isi Form &amp; Klik Simpan" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M2" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="305" y="160" as="sourcePoint" /><mxPoint x="495" y="160" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L2" parent="M2" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="2. POST /admin/students" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M3" edge="1" parent="1" style="html=1;endArrow=block;edgeStyle=orthogonalEdgeStyle;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="190" as="sourcePoint" /><mxPoint x="505" y="220" as="targetPoint" /><Array as="points"><mxPoint x="540" y="190" /><mxPoint x="540" y="220" /></Array></mxGeometry></mxCell>
    <mxCell id="L3" parent="M3" style="edgeLabel;html=1;align=left;verticalAlign=middle;" value="3. Validasi Input" vertex="1" connectable="0"><mxGeometry x="-0.1" relative="1" as="geometry"><mxPoint x="10" y="0" as="offset" /></mxGeometry></mxCell>

    <mxCell id="Alt_Frame" parent="1" style="shape=umlFrame;whiteSpace=wrap;html=1;width=40;height=20;boundedLbl=1;fontStyle=1" value="Alt" vertex="1"><mxGeometry height="330" width="650" x="75" y="250" as="geometry" /></mxCell>
    <mxCell id="Div" edge="1" parent="1" style="edgeStyle=none;html=1;dashed=1;endArrow=none;"><mxGeometry relative="1" as="geometry"><mxPoint x="75" y="370" /><mxPoint x="725" y="370" /></mxGeometry></mxCell>

    <mxCell id="M4" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="290" as="sourcePoint" /><mxPoint x="305" y="290" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L4" parent="M4" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="4. Redirect Back (Error)" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M5" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="330" as="sourcePoint" /><mxPoint x="100" y="330" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L5" parent="M5" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="5. Tampilkan Pesan Error" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M6" edge="1" parent="1" style="html=1;endArrow=block;"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="410" as="sourcePoint" /><mxPoint x="695" y="410" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L6" parent="M6" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="6. INSERT INTO students" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M7" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="695" y="450" as="sourcePoint" /><mxPoint x="505" y="450" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L7" parent="M7" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="7. Return Success" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M8" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="495" y="500" as="sourcePoint" /><mxPoint x="305" y="500" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L8" parent="M8" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="8. Redirect ke Index + Sukses" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>

    <mxCell id="M9" edge="1" parent="1" style="html=1;endArrow=open;dashed=1;"><mxGeometry relative="1" as="geometry"><mxPoint x="295" y="550" as="sourcePoint" /><mxPoint x="100" y="550" as="targetPoint" /></mxGeometry></mxCell>
    <mxCell id="L9" parent="M9" style="edgeLabel;html=1;align=center;verticalAlign=bottom;" value="9. Tampilkan Tabel &amp; Notifikasi" vertex="1" connectable="0"><mxGeometry x="0" y="0" relative="1" as="geometry"><mxPoint y="-2" as="offset" /></mxGeometry></mxCell>
  </root>
</mxGraphModel>"""

filepath = '/home/alislam/.gemini/antigravity-ide/brain/c88aac42-ee3b-41ed-83c2-4daf327d25a2/revised_sequence_xmls.md'
with open(filepath, 'r') as f:
    content = f.read()

new_content = content.replace("## 1. Mengelola Data Admin", f"## Sequence Diagram: Login\n```xml\n{login_xml}\n```\n\n## Sequence Diagram: Tambah Data Siswa\n```xml\n{siswa_xml}\n```\n\n## 1. Mengelola Data Admin")

with open(filepath, 'w') as f:
    f.write(new_content)

print("Appended Login and Siswa XMLs.")
