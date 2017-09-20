var	$numero = $('#numero'),
	$resultadoDec = $('#resultado-dec'),
	$resultadoBin = $('#resultado-bin'),
	$resultadoHex = $('#resultado-hex'),
	$selDecimal = $('.decimal'),
	$selBinario = $('.binario'),
	$selHexadecimal = $('.hexadecimal'),
	$error = $('#error'),
	executarConvercao = 0,
	num,
	let;

function DecToBin(){
	var bin = [],
		cont = 0,
		dec = $numero.val();
	while (dec >= 1) {
		bin[cont] = parseInt(dec) % 2;
		dec = parseInt(dec) / 2;
		cont++;
	}
	bin.reverse();
	$resultadoBin.html(bin.join(''));
}

function BinToDec(){
	var bin = $numero.val(),
		cont = 1,
		dec = 0,
		i;

	for (i = bin.length-1; i >= 0; i--){
		dec += bin[i] * cont;
		cont *= 2;
	}
	$resultadoDec.html(dec);
}

function DecToHex(){
	var hex = [],
		cont = 0,
		dec = $numero.val(),
		i;	
	while (dec >= 1) {
		hex[cont] = parseInt(dec) % 16;
		dec = parseInt(dec) / 16;
		cont++;
	}
	for(i = 0; i < hex.length; i++){
		if(hex[i] > 9){
			hex[i] = numToLet(hex[i]);
		}
	}
	hex.reverse();
	$resultadoHex.html(hex.join(''));
}

function HexToDec(){
	var hex = $numero.val(),
		hex2 = [],
		cont = 1,
		dec = 0,
		i,j;
	for (j = 0; j < hex.length; j++){
		hex2[j] = letToNum(hex[j]);
	}
	for (i = hex2.length-1; i >= 0; i--){
		dec += hex2[i] * cont;
		cont *= 16;
	}
	$resultadoDec.html(dec);
}

function BinToHex(){
	var bin = $numero.val(),
		binario = [],
		hexadecimal = [],
		quantidade,
		cont = 1,
		largo,
		i,
		j = 0;
	for(i = 0; i < bin.length; i++){
		binario[i] = parseInt(bin[i]);;
	}
	binario.reverse();
	largo = bin.length;
	quantidade = Math.ceil(largo/4);
	for (i = 0; i < quantidade; i++){
		hexadecimal[i] = 0;
	}
	for(i = 0; i < largo; i++){
		binario[i] *= cont;
		hexadecimal[j] += binario[i];
		cont *= 2;
		if(cont > 8){
			cont = 1;
			j++;
		}
	}
	hexadecimal.reverse();
	for(i = 0; i < hexadecimal.length; i++){
		if(hexadecimal[i] > 9){
			hexadecimal[i] = numToLet(hexadecimal[i]);
		}
	}
	$resultadoHex.html(hexadecimal.join(''));
}

function HexToBin(){
	var hex = $numero.val(),
		bin = [],
		aux = [],
		cont = 0,
		i,j;

	for(i = 0; i < hex.length; i++){
		aux[i] = letToNum(hex[i]);
		while(aux[i] >= 1){
			bin[cont] = parseInt(aux[i]) % 2;
			aux[i] = parseInt(aux[i]) / 2;
			cont++
		}
	}
	for(i = 0; i < bin.length; i+=4){
		j = bin[i];
		bin[i] = bin[i+3];
		bin[i+3] = j;
		j = bin[i+1];
		bin[i+1] = bin[i+2];
		bin[i+2] = j;
	}
	$resultadoBin.html(bin.join(''));
}

function numToLet(num){
	if(num == 10){
		let = 'A';
	}else if(num == 11){
		let = 'B';
	}else if(num == 12){
		let = 'C';
	}else if(num == 13){
		let = 'D';
	}else if(num == 14){
		let = 'E';
	}else if(num == 15){
		let = 'F';
	}
	return let;
}

function letToNum(let){
	if(let == 'A' || let == 'a'){
		num = 10;
	}else if(let == 'B' || let == 'b'){
		num = 11;
	}else if(let == 'C' || let == 'c'){
		num = 12;
	}else if(let == 'D' || let == 'd'){
		num = 13;
	}else if(let == 'E' || let == 'e'){
		num = 14;
	}else if(let == 'F' || let == 'f'){
		num = 15;
	}else{
		num = let;
	}
	return num;
}

function decSelect(e){
	e.preventDefault();
	executarConvercao = 0;
	$('.tipo').html('<h5>Calcula um numero Decimal</h5>');
}

function binSelect(e){
	e.preventDefault();
	executarConvercao = 1;
	$('.tipo').html('<h5>Calcula um numero Binario</h5>');
}

function hexSelect(e){
	e.preventDefault();
	executarConvercao = 2;
	$('.tipo').html('<h5>Calcula um numero Hexadecimal</h5>');
}

function ejecutar(){
	if(executarConvercao == 0){
		$resultadoDec.html($numero.val());
		DecToBin();
		DecToHex();
	}else if (executarConvercao == 1){
		BinToDec();
		$resultadoBin.html($numero.val());
		BinToHex();
	}else if (executarConvercao == 2){
		HexToDec();
		HexToBin();
		$resultadoHex.html($numero.val());
	}
}

function verificarSistema(){
	var i,
		numero = $numero.val(),
		aux = [],
		errorText = true;
	if(numero == ''){
		$resultadoDec.html('');
		$resultadoBin.html('');
		$resultadoHex.html('');
	}
	if(executarConvercao == 0){
		for(i = 0; i < numero.length; i++){
			if(numero[i] >= 0 || numero[i] <= 9){
				ejecutar();
			}else{
				$error.slideDown().html('<span>Certeza que esse numero é decimal?</span>');
				errorText = false;
			}
		}
		if(errorText){
			$error.slideUp();
		}
	}else if(executarConvercao == 1){
		for(i = 0; i < numero.length; i++){
			if(numero[i] == 0 || numero[i] == 1){
				ejecutar();	
			}else{
				$error.slideDown().html('<span>Certeza que esse numero é Binario?</span>');
				errorText = false;
			}
		}
		if(errorText){
			$error.slideUp();
		}
	}else if(executarConvercao == 2){
		for(i = 0; i < numero.length; i++){
			aux[i] = letToNum(numero[i]);
			if(aux[i] >= 0 || aux[i] <= 15){
				ejecutar();
			}else{
				$error.slideDown().html('<span>Certeza que esse numero é Hexadecimal?</span>');
				errorText = false;
			}
		}
		if(errorText){
			$error.slideUp();
		}
	}
}

$('.decimal').click( decSelect );
$('.binario').click( binSelect );
$('.hexadecimal').click( hexSelect );
$(document).keyup(verificarSistema);
