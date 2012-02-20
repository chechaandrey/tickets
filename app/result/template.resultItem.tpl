<tr data-name="item" data-id="<%= FlightId %>">
    <td>
        <div class="logo"></div>
        <div><%= ValCompany %></div>
    </td>
    <td>
        <table>
            <tbody>
            <% Segments.each(function(seg) {
                var DepDateTime = new iDate(seg.get('DepDateTime'), 'Y-m-d\\TH:i:s');
                var ArrDateTime = new iDate(seg.get('ArrDateTime'), 'Y-m-d\\TH:i:s');
                %>
                <tr>
                    <td><%= seg.get('DepAirp') %>(<%= seg.get('DepAirpCode') %>)</td>
                    <td><%= DepDateTime.toString('H:i') %></td>
                    <td>-></td>
                    <td><%= seg.get('ArrAirp') %>(<%= seg.get('ArrAirpCode') %>)</td>
                    <td><%= ArrDateTime.toString('H:i') %></td>
                    <td><%= seg.get('FlightTime') %></td>
                </tr>
            <% }); %>
            </tbody>
        </table>
    </td>
    <td>
        <div><span><%= new iMoney(TotalPrice).toString() %></span><span><%= TotalPriceCurrency %></span></div>
        <div><a href="javascript: void(0)" data-id="<%= FlightId %>"><%= this.l10n("book") %></a></div>
    </td>
</tr>
