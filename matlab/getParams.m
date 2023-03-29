function data = getParams(a,b,c)
    data.a = a;
    data.b = b;
    data.c = c;
    disp(jsonencode(data,"PrettyPrint",false))
end