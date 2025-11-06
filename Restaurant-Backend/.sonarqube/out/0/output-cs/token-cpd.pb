˘B
ZY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\AutoMapperProfile\AutoMapperProfile.cs
	namespace 	
Restaurant_Backend
 
. 
AutoMapperProfile .
;. /
public 
class 
AutoMapperProfile 
:  
Profile! (
{ 
private 
readonly 
IServiceProvider %
_serviceProvider& 6
;6 7
public 

AutoMapperProfile 
( 
IServiceProvider -
serviceProvider. =
)= >
{ 
_serviceProvider 
= 
serviceProvider *
;* +
	CreateMap 
< 
OrderRequest 
, 
Order  %
>% &
(& '
)' (
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
ProductList$ /
,/ 0
opt1 4
=>5 7
opt8 ;
.; <
Ignore< B
(B C
)C D
)D E
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
Table$ )
,) *
opt+ .
=>/ 1
opt2 5
.5 6
Ignore6 <
(< =
)= >
)> ?
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
TableSession$ 0
,0 1
opt2 5
=>6 8
opt9 <
.< =
Ignore= C
(C D
)D E
)E F
;F G
	CreateMap 
< 
OrderDetailItem !
,! "
OrderDetail# .
>. /
(/ 0
)0 1
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
OrderId$ +
,+ ,
opt- 0
=>1 3
opt4 7
.7 8
Ignore8 >
(> ?
)? @
)@ A
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
Order$ )
,) *
opt+ .
=>/ 1
opt2 5
.5 6
Ignore6 <
(< =
)= >
)> ?
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
Product$ +
,+ ,
opt- 0
=>1 3
opt4 7
.7 8
Ignore8 >
(> ?
)? @
)@ A
;A B
	CreateMap 
< 
Order 
, 
OrderResponse &
>& '
(' (
)( )
. 
	ForMember 
( 
dest 
=> 
dest #
.# $
TableNumber$ /
,/ 0
opt1 4
=>5 7
opt8 ;
.; <
MapFrom< C
(C D
srcD G
=>H J
srcK N
.N O
TableO T
.T U
NumberU [
)[ \
)\ ]
;] ^
	CreateMap 
< 
OrderDetail 
, 
OrderDetailResponse 2
>2 3
(3 4
)4 5
.   
	ForMember   
(   
dest   
=>   
dest   #
.  # $
ProductName  $ /
,  / 0
opt  1 4
=>  5 7
opt  8 ;
.  ; <
MapFrom  < C
(  C D
src  D G
=>  H J
src  K N
.  N O
Product  O V
.  V W
Name  W [
)  [ \
)  \ ]
.!! 
	ForMember!! 
(!! 
dest!! 
=>!! 
dest!! #
.!!# $
Description!!$ /
,!!/ 0
opt!!1 4
=>!!5 7
opt!!8 ;
.!!; <
MapFrom!!< C
(!!C D
src!!D G
=>!!H J
src!!K N
.!!N O
Product!!O V
.!!V W
Description!!W b
)!!b c
)!!c d
;!!d e
	CreateMap%% 
<%% 
ProductRequest%%  
,%%  !
Product%%" )
>%%) *
(%%* +
)%%+ ,
;%%, -
	CreateMap&& 
<&& 
Product&& 
,&& 
ProductResponse&& *
>&&* +
(&&+ ,
)&&, -
;&&- .
	CreateMap)) 
<)) 
TableRequest)) 
,)) 
Table))  %
>))% &
())& '
)))' (
;))( )
	CreateMap** 
<** 
Table** 
,** 
TableResponse** &
>**& '
(**' (
)**( )
;**) *
	CreateMap-- 
<-- 
TableSession-- 
,-- 
SessionResponse--  /
>--/ 0
(--0 1
)--1 2
... 
	ForMember.. 
(.. 
dest.. 
=>.. 
dest.. #
...# $
TableId..$ +
,..+ ,
opt..- 0
=>..1 3
opt..4 7
...7 8
MapFrom..8 ?
(..? @
src..@ C
=>..D F
src..G J
...J K
TableId..K R
)..R S
)..S T
.// 
	ForMember// 
(// 
dest// 
=>// 
dest// #
.//# $
IsActive//$ ,
,//, -
opt//. 1
=>//2 4
opt//5 8
.//8 9
MapFrom//9 @
(//@ A
src//A D
=>//E G
src//H K
.//K L
IsActive//L T
)//T U
)//U V
.00 
	ForMember00 
(00 
dest00 
=>00 
dest00 #
.00# $
EndTime00$ +
,00+ ,
opt00- 0
=>001 3
opt004 7
.007 8
MapFrom008 ?
(00? @
src00@ C
=>00D F
src00G J
.00J K
EndTime00K R
)00R S
)00S T
.11 
	ForMember11 
(11 
dest11 
=>11 
dest11 #
.11# $
Orders11$ *
,11* +
opt11, /
=>110 2
opt113 6
.116 7
MapFrom117 >
(11> ?
src11? B
=>11C E
src11F I
.11I J
Orders11J P
)11P Q
)11Q R
;11R S
	CreateMap22 
<22 
SessionRequest22  
,22  !
TableSession22" .
>22. /
(22/ 0
)220 1
.33 
AfterMap33 
(33 
(33 
src33 
,33 
dest33  
)33  !
=>33" $
{44 
dest55 
.55 
TableId55 
=55 
src55 "
.55" #
TableId55# *
;55* +
dest66 
.66 
Table66 
=66 
null66 !
;66! "
dest77 
.77 
IsActive77 
=77 
true77  $
;77$ %
}88 
)88 
;88 
	CreateMapKK 
<KK 
RegisterUserRequestKK %
,KK% &
UserKK' +
>KK+ ,
(KK, -
)KK- .
.LL 
	ForMemberLL 
(LL 
destLL 
=>LL 
destLL #
.LL# $
IsActiveLL$ ,
,LL, -
optLL. 1
=>LL2 4
optLL5 8
.LL8 9
MapFromLL9 @
(LL@ A
srcLLA D
=>LLE G
trueLLH L
)LLL M
)LLM N
.MM 
	ForMemberMM 
(MM 
destMM 
=>MM 
destMM #
.MM# $
	LastLoginMM$ -
,MM- .
optMM/ 2
=>MM3 5
optMM6 9
.MM9 :
IgnoreMM: @
(MM@ A
)MMA B
)MMB C
;MMC D
	CreateMapNN 
<NN 
UpdateUserRequestNN #
,NN# $
UserNN% )
>NN) *
(NN* +
)NN+ ,
.OO 
	ForMemberOO 
(OO 
destOO 
=>OO 
destOO #
.OO# $
	LastLoginOO$ -
,OO- .
optOO/ 2
=>OO3 5
optOO6 9
.OO9 :
IgnoreOO: @
(OO@ A
)OOA B
)OOB C
;OOC D
}QQ 
}RR Æ
\Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\AutoMapperProfile\ResolveEntityFromId.cs
	namespace 	
Restaurant_Backend
 
. 
AutoMapperProfile .
;. /
public 
static 
class $
MappingContextExtensions ,
{		 
public

 

static

 
void

 
ResolveEntity

 $
<

$ %
TSource

% ,
,

, -
TDestination

. :
,

: ;
TEntity

< C
>

C D
(

D E
this 
ResolutionContext 
context &
,& '
TSource 
source 
, 
TDestination 
destination  
,  !
Func 
< 
TSource 
, 
object 
> 

idSelector (
,( )
Action 
< 
TDestination 
, 
TEntity $
>$ %
	setEntity& /
,/ 0
Action 
< 
TDestination 
, 
object #
># $
setEntityId% 0
,0 1
AppDbContext 
db 
) 
where 
TEntity 
: 
class 
{ 
var 
id 
= 

idSelector 
( 
source "
)" #
;# $
var 
entity 
= 
db 
. 
Find 
( 
typeof #
(# $
TEntity$ +
)+ ,
,, -
id. 0
)0 1
as2 4
TEntity5 <
?? 
throw 
new 
	Exception  )
() *
$"* ,
{, -
typeof- 3
(3 4
TEntity4 ;
); <
.< =
Name= A
}A B
$strB T
{T U
idU W
}W X
"X Y
)Y Z
;Z [
	setEntity 
( 
destination 
, 
entity %
)% &
;& '
setEntityId 
( 
destination 
,  
id! #
)# $
;$ %
db 

.
 
Entry 
( 
entity 
) 
. 
State 
=  
EntityState! ,
., -
	Unchanged- 6
;6 7
} 
} ƒ
kY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\AutoMapperProfile\SessionRequestToTableSessionAction.cs
	namespace 	
Restaurant_Backend
 
. 
AutoMapperProfile .
;. /
public 
class .
"SessionRequestToTableSessionAction /
:0 1
IMappingAction2 @
<@ A
SessionRequestA O
,O P
TableSessionQ ]
>] ^
{		 
private

 
readonly

 
AppDbContext

 !
_context

" *
;

* +
public 
.
"SessionRequestToTableSessionAction -
(- .
AppDbContext. :
context; B
)B C
{ 
_context 
= 
context 
; 
} 
public 

void 
Process 
( 
SessionRequest &
source' -
,- .
TableSession/ ;
destination< G
,G H
ResolutionContextI Z
context[ b
)b c
{ 
var 
table 
= 
_context 
. 
Tables #
.# $
Find$ (
(( )
source) /
./ 0
TableId0 7
)7 8
?? 
throw 
new 
	Exception "
(" #
$str# 4
)4 5
;5 6
destination 
. 
TableId 
= 
source $
.$ %
TableId% ,
;, -
destination 
. 
Table 
= 
table !
;! "
destination 
. 
IsActive 
= 
true #
;# $
} 
} Í
KY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Context\AppDbContext.cs
	namespace 	
Restaurant_Backend
 
. 
Context $
;$ %
public 
class 
AppDbContext 
: 
	DbContext %
{ 
public 

AppDbContext 
( 
DbContextOptions (
<( )
AppDbContext) 5
>5 6
options7 >
)> ?
:@ A
baseB F
(F G
optionsG N
)N O
{		 
} 
	protected 
override 
void 
OnModelCreating +
(+ ,
ModelBuilder, 8
modelBuilder9 E
)E F
{ 
base 
. 
OnModelCreating 
( 
modelBuilder )
)) *
;* +
modelBuilder 
. 
Entity 
< 
Order !
>! "
(" #
)# $
. 
HasMany 
( 
o 
=> 
o 
. 
ProductList '
)' (
. 
WithOne 
( 
od 
=> 
od 
. 
Order #
)# $
. 
HasForeignKey 
( 
od 
=>  
od! #
.# $
OrderId$ +
)+ ,
. 
OnDelete 
( 
DeleteBehavior $
.$ %
Cascade% ,
), -
;- .
} 
public 

virtual 
DbSet 
< 
User 
> 
Users $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 

virtual 
DbSet 
< 
Table 
> 
Tables  &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 

virtual 
DbSet 
< 
Order 
> 
Orders  &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 

virtual 
DbSet 
< 
OrderDetail $
>$ %
OrderDetails& 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
public 

virtual 
DbSet 
< 
Product  
>  !
Products" *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
public 

virtual 
DbSet 
< 
TableSession %
>% &
TableSessions' 4
{5 6
get7 :
;: ;
set< ?
;? @
}A B
} ıK
[Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\AuthenticationController.cs
	namespace

 	
Restaurant_Backend


 
.

 
Controllers

 (
;

( )
[ 
Route 
( 
$str 
) 
] 
[ 
ApiController 
] 
[ 
AllowAnonymous 
] 
[ 
	Authorize 

]
 
public 
class $
AuthenticationController %
:& '
BaseController( 6
{ 
private 
readonly "
IAuthenticationService +"
_authenticationService, B
;B C
private 
readonly 
IMapper 
_mapper $
;$ %
public 
$
AuthenticationController #
(# $"
IAuthenticationService$ :!
authenticationService; P
,P Q
IMapperR Y
mapperZ `
,` a
IUserServiceb n
userServiceo z
,z {!
IHttpContextAccessor	| ê!
httpContextAccessor
ë §
)
§ •
: 	
base
 
( 
httpContextAccessor "
," #
userService$ /
)/ 0
{ "
_authenticationService 
=  !
authenticationService! 6
;6 7
_mapper 
= 
mapper 
; 
} 
[ 
	Authorize 
( 
Roles 
= 
$str &
)& '
]' (
[ 
HttpPost 
( 
$str 
) 
] 
public   

async   
Task   
<   
IActionResult   #
>  # $
Register  % -
(  - .
RegisterUserRequest  . A
userRequest  B M
)  M N
{!! 
if"" 

("" 
await"" 
_userService"" 
."" &
CheckIfUsernameExistsAsync"" 9
(""9 :
userRequest"": E
.""E F
UserName""F N
)""N O
)""O P
{## 	
return$$ 

BadRequest$$ 
($$ 
$str$$ 8
)$$8 9
;$$9 :
}%% 	
string'' 
hashPassword'' 
='' 
Encrypt'' %
.''% &
Hash''& *
(''* +
userRequest''+ 6
.''6 7
Password''7 ?
)''? @
;''@ A
var)) 
newUser)) 
=)) 
_mapper)) 
.)) 
Map)) !
<))! "
User))" &
>))& '
())' (
userRequest))( 3
)))3 4
;))4 5
newUser** 
.** 
Password** 
=** 
hashPassword** '
;**' (
bool,, 
result,, 
=,, 
await,, 
_userService,, (
.,,( )
CreateUserAsync,,) 8
(,,8 9
newUser,,9 @
),,@ A
;,,A B
return.. 
result.. 
?.. 
Ok.. 
(.. 
).. 
:.. 

BadRequest.. )
(..) *
$str..* A
)..A B
;..B C
}// 
[11 
HttpPost11 
(11 
$str11 
)11 
]11 
public22 

async22 
Task22 
<22 
IActionResult22 #
>22# $
Verify22% +
(22+ ,
)22, -
{33 
Guid44 
?44 
userId44 
=44 
GetUserIdFromToken44 )
(44) *
)44* +
;44+ ,
if66 

(66 
userId66 
is66 
null66 
||66 
!66 
await66 $
ValidateUserId66% 3
(663 4
userId664 :
)66: ;
)66; <
{77 	
return88 

BadRequest88 
(88 
$str88 0
)880 1
;881 2
}99 	
return;; 
Ok;; 
(;; 
);; 
;;; 
}<< 
[?? 
HttpGet?? 
(?? 
$str?? 
)?? 
]?? 
public@@ 

async@@ 
Task@@ 
<@@ 
IActionResult@@ #
>@@# $

GetProfile@@% /
(@@/ 0
)@@0 1
{AA 
GuidBB 
?BB 
userIdBB 
=BB 
GetUserIdFromTokenBB )
(BB) *
)BB* +
;BB+ ,
ifDD 

(DD 
!DD 
awaitDD 
ValidateUserIdDD !
(DD! "
userIdDD" (
)DD( )
)DD) *
{EE 	
returnFF 

BadRequestFF 
(FF 
$strFF 0
)FF0 1
;FF1 2
}GG 	
ifHH 

(HH 
userIdHH 
isHH 
nullHH 
)HH 
{II 	
returnJJ 

BadRequestJJ 
(JJ 
$strJJ 0
)JJ0 1
;JJ1 2
}KK 	
UserMM 
?MM 
userMM 
=MM 
awaitMM 
_userServiceMM '
.MM' (
GetUserByIdAsyncMM( 8
(MM8 9
(MM9 :
GuidMM: >
)MM> ?
userIdMM? E
)MME F
;MMF G
ifOO 

(OO 
userOO 
isOO 
nullOO 
)OO 
returnOO  
NotFoundOO! )
(OO) *
)OO* +
;OO+ ,
returnQQ 
OkQQ 
(QQ 
newQQ 
{RR 	
userSS 
.SS 
IdSS 
,SS 
userNameTT 
=TT 
userTT 
.TT 
	FirstNameTT %
,TT% &
userUU 
.UU 
RoleUU 
,UU 
userVV 
.VV 
	CreatedAtVV 
}WW 	
)WW	 

;WW
 
}XX 
[[[ 
AllowAnonymous[[ 
][[ 
[\\ 
HttpPost\\ 
(\\ 
$str\\ 
)\\ 
]\\ 
public]] 

async]] 
Task]] 
<]] 
IActionResult]] #
>]]# $
Login]]% *
(]]* +
AccessRequest]]+ 8
request]]9 @
)]]@ A
{^^ 
User__ 
?__ 
user__ 
=__ 
await__ 
_userService__ '
.__' (
GetUserByNameAsync__( :
(__: ;
request__; B
.__B C
UserName__C K
)__K L
;__L M
ifaa 

(aa 
useraa 
isaa 
nullaa 
)aa 
returnaa  

BadRequestaa! +
(aa+ ,
$straa, B
)aaB C
;aaC D
ifcc 

(cc 
!cc 
Encryptcc 
.cc 
	CheckHashcc 
(cc 
requestcc &
.cc& '
Passwordcc' /
,cc/ 0
usercc1 5
.cc5 6
Passwordcc6 >
)cc> ?
)cc? @
returnccA G

BadRequestccH R
(ccR S
$strccS i
)cci j
;ccj k"
AuthenticationResponseee 
responseee '
=ee( )"
_authenticationServiceee* @
.ee@ A
GenerateJwteeA L
(eeL M
usereeM Q
)eeQ R
;eeR S
returngg 
Okgg 
(gg 
responsegg 
)gg 
;gg 
}hh 
[jj 
	Authorizejj 
(jj 
Rolesjj 
=jj 
$strjj &
)jj& '
]jj' (
[kk 
	HttpPatchkk 
(kk 
$strkk 
)kk 
]kk 
publicll 

asyncll 
Taskll 
<ll 
IActionResultll #
>ll# $

UpdateUserll% /
(ll/ 0
Guidll0 4
idll5 7
,ll7 8
[ll9 :
FromBodyll: B
]llB C
UpdateUserRequestllD U
requestllV ]
)ll] ^
{mm 
varnn 
usernn 
=nn 
awaitnn 
_userServicenn %
.nn% &
GetUserByIdAsyncnn& 6
(nn6 7
idnn7 9
)nn9 :
;nn: ;
ifoo 

(oo 
useroo 
==oo 
nulloo 
)oo 
returnoo  
NotFoundoo! )
(oo) *
)oo* +
;oo+ ,
userrr 
.rr 
	FirstNamerr 
=rr 
requestrr  
.rr  !
	FirstNamerr! *
??rr+ -
userrr. 2
.rr2 3
	FirstNamerr3 <
;rr< =
userss 
.ss 
LastNamess 
=ss 
requestss 
.ss  
LastNamess  (
??ss) +
userss, 0
.ss0 1
LastNamess1 9
;ss9 :
usertt 
.tt 
Emailtt 
=tt 
requesttt 
.tt 
Emailtt "
??tt# %
usertt& *
.tt* +
Emailtt+ 0
;tt0 1
useruu 
.uu 
Roleuu 
=uu 
requestuu 
.uu 
Roleuu  
??uu! #
useruu$ (
.uu( )
Roleuu) -
;uu- .
awaitww 
_userServiceww 
.ww 
UpdateUserAsyncww *
(ww* +
userww+ /
)ww/ 0
;ww0 1
returnyy 
Okyy 
(yy 
)yy 
;yy 
}zz 
}|| ‹
QY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\BaseController.cs
	namespace 	
Restaurant_Backend
 
. 
Controllers (
;( )
public 
abstract 
class 
BaseController $
:% &
ControllerBase' 5
{ 
	protected		 
readonly		  
IHttpContextAccessor		 + 
_httpContextAccessor		, @
;		@ A
	protected

 
readonly

 
IUserService

 #
_userService

$ 0
;

0 1
	protected 
BaseController 
(  
IHttpContextAccessor 1
httpContextAccessor2 E
,E F
IUserServiceG S
userServiceT _
)_ `
{  
_httpContextAccessor 
= 
httpContextAccessor 2
;2 3
_userService 
= 
userService "
;" #
} 
	protected 
Guid 
? 
GetUserIdFromToken &
(& '
)' (
{ 
Claim 
? 
userIdClaim 
=  
_httpContextAccessor 1
.1 2
HttpContext2 =
?= >
.> ?
User? C
.C D
	FindFirstD M
(M N
$strN V
)V W
;W X
if 

( 
userIdClaim 
is 
null 
||  "
!# $
Guid$ (
.( )
TryParse) 1
(1 2
userIdClaim2 =
.= >
Value> C
,C D
outE H
GuidI M
userIdN T
)T U
)U V
{ 	
return 
null 
; 
} 	
return 
userId 
; 
} 
	protected 
async 
Task 
< 
bool 
> 
ValidateUserId -
(- .
Guid. 2
?2 3
userId4 :
): ;
{ 
if 

( 
userId 
is 
null 
|| 
await #
_userService% 1
.1 2
GetUserByIdAsync2 B
(B C
userIdC I
.I J
ValueJ O
)O P
isQ S
nullT X
)X Y
{ 	
return   
false   
;   
}!! 	
return"" 
true"" 
;"" 
}## 
}$$ …‰
RY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\OrderController.cs
	namespace 	
Restaurant_Backend
 
. 
Controllers (
;( )
[ 
Route 
( 
$str 
) 
] 
[ 
ApiController 
] 
public 
class 
OrderController 
: 
BaseController -
{ 
private 
readonly 
IOrderService "
_orderService# 0
;0 1
private 
readonly 
IOrderDetailService (
_orderDetailService) <
;< =
private 
readonly 
IProductService $
_productService% 4
;4 5
private 
readonly 
IMapper 
_mapper $
;$ %
private 
readonly 
ITableService "
_tableService# 0
;0 1
private 
readonly  
ITableSessionService ) 
_tableSessionService* >
;> ?
public 

OrderController 
( 
IOrderService (
orderService) 5
,5 6
IProductService7 F
productServiceG U
,U V
IOrderDetailServiceW j
orderDetailServicek }
,} ~
IMapper	 Ü
mapper
á ç
,
ç é
ITableService
è ú
tableService
ù ©
,
© ™"
ITableSessionService
´ ø!
tableSessionService
¿ ”
,
” ‘"
IHttpContextAccessor
’ È!
httpContextAccessor
Í ˝
,
˝ ˛
IUserService
˛ ä
userService
ã ñ
)
ñ ó
:
ò ô
base
ö û
(
û ü!
httpContextAccessor
ü ≤
,
≤ ≥
userService
¥ ø
)
ø ¿
{ 
_orderService 
= 
orderService $
;$ %
_productService 
= 
productService (
;( )
_orderDetailService   
=   
orderDetailService   0
;  0 1
_mapper!! 
=!! 
mapper!! 
;!! 
_tableService"" 
="" 
tableService"" $
;""$ % 
_tableSessionService## 
=## 
tableSessionService## 2
;##2 3
}$$ 
[++ 
	Authorize++ 
(++ 
Roles++ 
=++ 
$str++ 5
)++5 6
]++6 7
[,, 
HttpGet,, 
(,, 
$str,, 
),, 
],, 
public-- 

async-- 
Task-- 
<-- 
ActionResult-- "
>--" #
GetOrderById--$ 0
(--0 1
Guid--1 5
orderId--6 =
)--= >
{.. 
try// 
{00 	
var11 
order11 
=11 
await11 
_orderService11 +
.11+ ,
GetOrderByIdAsync11, =
(11= >
orderId11> E
)11E F
;11F G
var22 
orderResponse22 
=22 
_mapper22  '
.22' (
Map22( +
<22+ ,
OrderResponse22, 9
>229 :
(22: ;
order22; @
)22@ A
;22A B
return33 
Ok33 
(33 
orderResponse33 #
)33# $
;33$ %
}44 	
catch55 
(55 "
OrderNotFoundException55 %
ex55& (
)55( )
{66 	
return77 
NotFound77 
(77 
ex77 
.77 
Message77 &
)77& '
;77' (
}88 	
catch99 
(99 
	Exception99 
ex99 
)99 
{:: 	
return;; 

StatusCode;; 
(;; 
$num;; !
,;;! "
$";;# %
$str;;% <
{;;< =
ex;;= ?
.;;? @
Message;;@ G
};;G H
";;H I
);;I J
;;;J K
}<< 	
}== 
[?? 
	Authorize?? 
(?? 
Roles?? 
=?? 
$str?? 5
)??5 6
]??6 7
[@@ 
HttpGet@@ 
(@@ 
)@@ 
]@@ 
publicAA 

asyncAA 
TaskAA 
<AA 
ActionResultAA "
>AA" #
GetAllOrdersAA$ 0
(AA0 1
)AA1 2
{BB 
tryCC 
{DD 	
varEE 
ordersEE 
=EE 
awaitEE 
_orderServiceEE ,
.EE, -
GetAllOrdersAsyncEE- >
(EE> ?
)EE? @
;EE@ A
varFF 
orderResponsesFF 
=FF  
newFF! $
ListFF% )
<FF) *
OrderResponseFF* 7
>FF7 8
(FF8 9
)FF9 :
;FF: ;
foreachHH 
(HH 
varHH 
orderHH 
inHH !
ordersHH" (
)HH( )
{II 
varJJ 
mappedJJ 
=JJ 
_mapperJJ $
.JJ$ %
MapJJ% (
<JJ( )
OrderResponseJJ) 6
>JJ6 7
(JJ7 8
orderJJ8 =
)JJ= >
;JJ> ?
orderResponsesKK 
.KK 
AddKK "
(KK" #
mappedKK# )
)KK) *
;KK* +
}LL 
returnNN 
OkNN 
(NN 
orderResponsesNN $
)NN$ %
;NN% &
}OO 	
catchPP 
(PP "
OrderNotFoundExceptionPP %
exPP& (
)PP( )
{QQ 	
returnRR 
NotFoundRR 
(RR 
exRR 
.RR 
MessageRR &
)RR& '
;RR' (
}SS 	
catchTT 
(TT 
	ExceptionTT 
exTT 
)TT 
{UU 	
returnVV 

StatusCodeVV 
(VV 
$numVV !
,VV! "
$"VV# %
$strVV% <
{VV< =
exVV= ?
.VV? @
MessageVV@ G
}VVG H
"VVH I
)VVI J
;VVJ K
}WW 	
}XX 
[__ 
	Authorize__ 
(__ 
Roles__ 
=__ 
$str__ 5
)__5 6
]__6 7
[`` 
HttpGet`` 
(`` 
$str`` 
)`` 
]``  
publicaa 

asyncaa 
Taskaa 
<aa 
ActionResultaa "
<aa" #
IEnumerableaa# .
<aa. /
OrderRequestaa/ ;
>aa; <
>aa< =
>aa= >
GetOrdersByTableaa? O
(aaO P
GuidaaP T
tableIdaaU \
)aa\ ]
{bb 
trycc 
{dd 	
varee 
tableOrdersee 
=ee 
awaitee #
_orderServiceee$ 1
.ee1 2
GetTableOrdersAsyncee2 E
(eeE F
tableIdeeF M
)eeM N
;eeN O
ifff 
(ff 
tableOrdersff 
isff 
nullff #
||ff$ &
!ff' (
tableOrdersff( 3
.ff3 4
Anyff4 7
(ff7 8
)ff8 9
)ff9 :
returngg 
NotFoundgg 
(gg  
$strgg  O
)ggO P
;ggP Q
returnii 
Okii 
(ii 
tableOrdersii !
)ii! "
;ii" #
}jj 	
catchkk 
(kk 
	Exceptionkk 
exkk 
)kk 
{ll 	
returnmm 

StatusCodemm 
(mm 
$nummm !
,mm! "
$"mm# %
$strmm% b
{mmb c
exmmc e
.mme f
Messagemmf m
}mmm n
"mmn o
)mmo p
;mmp q
}nn 	
}oo 
[vv 
	Authorizevv 
(vv 
Rolesvv 
=vv 
$strvv 5
)vv5 6
]vv6 7
[ww 
HttpGetww 
(ww 
$strww "
)ww" #
]ww# $
publicxx 

asyncxx 
Taskxx 
<xx 
ActionResultxx "
<xx" #
IEnumerablexx# .
<xx. /
OrderRequestxx/ ;
>xx; <
>xx< =
>xx= >
GetOrdersBySessionxx? Q
(xxQ R
GuidxxR V
	sessionIdxxW `
)xx` a
{yy 
tryzz 
{{{ 	
var|| 
sessionOrders|| 
=|| 
await||  %
_orderService||& 3
.||3 4!
GetSessionOrdersAsync||4 I
(||I J
	sessionId||J S
)||S T
;||T U
if}} 
(}} 
sessionOrders}} 
is}}  
null}}! %
||}}& (
!}}) *
sessionOrders}}* 7
.}}7 8
Any}}8 ;
(}}; <
)}}< =
)}}= >
return~~ 
NotFound~~ 
(~~  
$str~~  Q
)~~Q R
;~~R S
return
ÄÄ 
Ok
ÄÄ 
(
ÄÄ 
sessionOrders
ÄÄ #
)
ÄÄ# $
;
ÄÄ$ %
}
ÅÅ 	
catch
ÇÇ 
(
ÇÇ 
	Exception
ÇÇ 
ex
ÇÇ 
)
ÇÇ 
{
ÉÉ 	
return
ÑÑ 

StatusCode
ÑÑ 
(
ÑÑ 
$num
ÑÑ !
,
ÑÑ! "
$"
ÑÑ# %
$str
ÑÑ% d
{
ÑÑd e
ex
ÑÑe g
.
ÑÑg h
Message
ÑÑh o
}
ÑÑo p
"
ÑÑp q
)
ÑÑq r
;
ÑÑr s
}
ÖÖ 	
}
ÜÜ 
[
çç 
	Authorize
çç 
(
çç 
Roles
çç 
=
çç 
$str
çç 5
)
çç5 6
]
çç6 7
[
éé 
HttpGet
éé 
(
éé 
$str
éé !
)
éé! "
]
éé" #
public
èè 

async
èè 
Task
èè 
<
èè 
ActionResult
èè "
<
èè" #
IEnumerable
èè# .
<
èè. /
OrderResponse
èè/ <
>
èè< =
>
èè= >
>
èè> ?
GetOrdersByStatus
èè@ Q
(
èèR S
OrderStatus
èèS ^
status
èè_ e
)
èèe f
{
êê 
try
ëë 
{
íí 	
var
ìì 
orders
ìì 
=
ìì 
await
ìì 
_orderService
ìì ,
.
ìì, -$
GetOrdersByStatusAsync
ìì- C
(
ììC D
status
ììD J
)
ììJ K
;
ììK L
if
îî 
(
îî 
orders
îî 
is
îî 
null
îî 
||
îî !
!
îî" #
orders
îî# )
.
îî) *
Any
îî* -
(
îî- .
)
îî. /
)
îî/ 0
return
ïï 
NotFound
ïï 
(
ïï  
$str
ïï  Q
)
ïïQ R
;
ïïR S
var
óó 
ordersResponse
óó 
=
óó  
_mapper
óó! (
.
óó( )
Map
óó) ,
<
óó, -
IEnumerable
óó- 8
<
óó8 9
OrderResponse
óó9 F
>
óóF G
>
óóG H
(
óóH I
orders
óóI O
)
óóO P
;
óóP Q
return
ôô 
Ok
ôô 
(
ôô 
ordersResponse
ôô $
)
ôô$ %
;
ôô% &
}
öö 	
catch
õõ 
(
õõ 
	Exception
õõ 
ex
õõ 
)
õõ 
{
úú 	
return
ùù 

StatusCode
ùù 
(
ùù 
$num
ùù !
,
ùù! "
$"
ùù# %
$str
ùù% Z
{
ùùZ [
ex
ùù[ ]
.
ùù] ^
Message
ùù^ e
}
ùùe f
"
ùùf g
)
ùùg h
;
ùùh i
}
ûû 	
}
üü 
[
ßß 
	Authorize
ßß 
(
ßß 
Roles
ßß 
=
ßß 
$str
ßß 5
)
ßß5 6
]
ßß6 7
[
®® 
	HttpPatch
®® 
(
®® 
$str
®® !
)
®®! "
]
®®" #
public
©© 

async
©© 
Task
©© 
<
©© 
IActionResult
©© #
>
©©# $
ChangeOrderStatus
©©% 6
(
©©6 7
Guid
©©7 ;
orderId
©©< C
,
©©C D
[
©©E F
FromBody
©©F N
]
©©N O
OrderStatus
©©P [
status
©©\ b
)
©©b c
{
™™ 
try
´´ 
{
¨¨ 	
var
≠≠ 
order
≠≠ 
=
≠≠ 
await
≠≠ 
_orderService
≠≠ +
.
≠≠+ ,
GetOrderByIdAsync
≠≠, =
(
≠≠= >
orderId
≠≠> E
)
≠≠E F
;
≠≠F G
var
ØØ 
validationResult
ØØ  
=
ØØ! "
await
ØØ# ((
ValidateActiveSessionAsync
ØØ) C
(
ØØC D
order
ØØD I
!
ØØI J
.
ØØJ K
TableSessionId
ØØK Y
)
ØØY Z
;
ØØZ [
if
∞∞ 
(
∞∞ 
validationResult
∞∞  
!=
∞∞! #
null
∞∞$ (
)
∞∞( )
return
±± 
validationResult
±± '
;
±±' (
order
≥≥ 
.
≥≥ 
Status
≥≥ 
=
≥≥ 
status
≥≥ !
;
≥≥! "
await
µµ 
_orderService
µµ 
.
µµ  
UpdateOrderAsync
µµ  0
(
µµ0 1
order
µµ1 6
)
µµ6 7
;
µµ7 8
return
∂∂ 
	NoContent
∂∂ 
(
∂∂ 
)
∂∂ 
;
∂∂ 
}
∑∑ 	
catch
∏∏ 
(
∏∏ $
OrderNotFoundException
∏∏ %
ex
∏∏& (
)
∏∏( )
{
ππ 	
return
∫∫ 
NotFound
∫∫ 
(
∫∫ 
ex
∫∫ 
.
∫∫ 
Message
∫∫ &
)
∫∫& '
;
∫∫' (
}
ªª 	
catch
ºº 
(
ºº 
	Exception
ºº 
ex
ºº 
)
ºº 
{
ΩΩ 	
return
ææ 

StatusCode
ææ 
(
ææ 
$num
ææ !
,
ææ! "
$"
ææ# %
$str
ææ% <
{
ææ< =
ex
ææ= ?
.
ææ? @
Message
ææ@ G
}
ææG H
"
ææH I
)
ææI J
;
ææJ K
}
øø 	
}
¿¿ 
[
«« 
	Authorize
«« 
(
«« 
Roles
«« 
=
«« 
$str
«« -
)
««- .
]
««. /
[
»» 
HttpPost
»» 
(
»» 
$str
»» 
)
»» 
]
»» 
public
…… 

async
…… 
Task
…… 
<
…… 
ActionResult
…… "
<
……" #
OrderRequest
……# /
>
……/ 0
>
……0 1
CreateOrder
……2 =
(
……= >
[
……> ?
FromBody
……? G
]
……G H
OrderRequest
……I U
orderRequest
……V b
)
……b c
{
   
try
ÀÀ 
{
ÃÃ 	
var
ÕÕ 
tableSession
ÕÕ 
=
ÕÕ 
await
ÕÕ $"
_tableSessionService
ÕÕ% 9
.
ÕÕ9 :,
GetActiveSessionByTableIdAsync
ÕÕ: X
(
ÕÕX Y
orderRequest
ÕÕY e
.
ÕÕe f
TableId
ÕÕf m
)
ÕÕm n
;
ÕÕn o
if
œœ 
(
œœ 
tableSession
œœ 
is
œœ 
null
œœ  $
)
œœ$ %
return
–– 
NotFound
–– 
(
––  
$str
––  B
)
––B C
;
––C D
var
““ 
order
““ 
=
““ 
_mapper
““ 
.
““  
Map
““  #
<
““# $
Order
““$ )
>
““) *
(
““* +
orderRequest
““+ 7
)
““7 8
;
““8 9
order
”” 
.
”” 
Table
”” 
=
”” 
tableSession
”” &
.
””& '
Table
””' ,
;
””, -
order
‘‘ 
.
‘‘ 
TableSession
‘‘ 
=
‘‘  
tableSession
‘‘! -
;
‘‘- .
order
’’ 
.
’’ 
TableId
’’ 
=
’’ 
tableSession
’’ (
.
’’( )
Table
’’) .
.
’’. /
Id
’’/ 1
;
’’1 2
order
÷÷ 
.
÷÷ 
TableSessionId
÷÷  
=
÷÷! "
tableSession
÷÷# /
.
÷÷/ 0
Id
÷÷0 2
;
÷÷2 3
order
◊◊ 
.
◊◊ 
Status
◊◊ 
=
◊◊ 
OrderStatus
◊◊ &
.
◊◊& '
	Confirmed
◊◊' 0
;
◊◊0 1
var
ŸŸ 
(
ŸŸ 
failed
ŸŸ 
,
ŸŸ 
missingProductId
ŸŸ )
)
ŸŸ) *
=
ŸŸ+ ,
await
ŸŸ- 2"
TryLoadProductsAsync
ŸŸ3 G
(
ŸŸG H
order
ŸŸH M
,
ŸŸM N
orderRequest
ŸŸO [
.
ŸŸ[ \
Items
ŸŸ\ a
)
ŸŸa b
;
ŸŸb c
if
⁄⁄ 
(
⁄⁄ 
failed
⁄⁄ 
)
⁄⁄ 
return
€€ 
NotFound
€€ 
(
€€  
$"
€€  "
$str
€€" *
{
€€* +
missingProductId
€€+ ;
}
€€; <
$str
€€< G
"
€€G H
)
€€H I
;
€€I J
order
›› 
.
›› 
TotalAmount
›› 
=
›› 
order
››  %
.
››% &
TotalAmountSum
››& 4
;
››4 5
var
ﬂﬂ 
createdOrder
ﬂﬂ 
=
ﬂﬂ 
await
ﬂﬂ $
_orderService
ﬂﬂ% 2
.
ﬂﬂ2 3
CreateOrderAsync
ﬂﬂ3 C
(
ﬂﬂC D
order
ﬂﬂD I
)
ﬂﬂI J
;
ﬂﬂJ K
var
‡‡ "
createdOrderResponse
‡‡ $
=
‡‡% &
_mapper
‡‡' .
.
‡‡. /
Map
‡‡/ 2
<
‡‡2 3
OrderResponse
‡‡3 @
>
‡‡@ A
(
‡‡A B
createdOrder
‡‡B N
)
‡‡N O
;
‡‡O P
return
‚‚ 
CreatedAtAction
‚‚ "
(
‚‚" #
nameof
‚‚# )
(
‚‚) *
GetOrderById
‚‚* 6
)
‚‚6 7
,
‚‚7 8
new
‚‚9 <
{
‚‚= >
orderId
‚‚? F
=
‚‚G H
createdOrder
‚‚I U
.
‚‚U V
Id
‚‚V X
}
‚‚Y Z
,
‚‚Z ["
createdOrderResponse
‚‚\ p
)
‚‚p q
;
‚‚q r
}
„„ 	
catch
‰‰ 
(
‰‰ 
	Exception
‰‰ 
ex
‰‰ 
)
‰‰ 
{
ÂÂ 	
return
ÊÊ 

StatusCode
ÊÊ 
(
ÊÊ 
$num
ÊÊ !
,
ÊÊ! "
$"
ÊÊ# %
$str
ÊÊ% P
{
ÊÊP Q
ex
ÊÊQ S
.
ÊÊS T
Message
ÊÊT [
}
ÊÊ[ \
"
ÊÊ\ ]
)
ÊÊ] ^
;
ÊÊ^ _
}
ÁÁ 	
}
ËË 
[
 
	Authorize
 
(
 
Roles
 
=
 
$str
 -
)
- .
]
. /
[
ÒÒ 
HttpPut
ÒÒ 
(
ÒÒ 
$str
ÒÒ 
)
ÒÒ 
]
ÒÒ 
public
ÚÚ 

async
ÚÚ 
Task
ÚÚ 
<
ÚÚ 
IActionResult
ÚÚ #
>
ÚÚ# $
UpdateOrder
ÚÚ% 0
(
ÚÚ0 1
Guid
ÚÚ1 5
orderId
ÚÚ6 =
,
ÚÚ= >
[
ÚÚ? @
FromBody
ÚÚ@ H
]
ÚÚH I
OrderRequest
ÚÚJ V
orderRequest
ÚÚW c
)
ÚÚc d
{
ÛÛ 
try
ÙÙ 
{
ıı 	
var
ˆˆ 
order
ˆˆ 
=
ˆˆ 
await
ˆˆ 
_orderService
ˆˆ +
.
ˆˆ+ ,
GetOrderByIdAsync
ˆˆ, =
(
ˆˆ= >
orderId
ˆˆ> E
)
ˆˆE F
;
ˆˆF G
var
¯¯ 
validationResult
¯¯  
=
¯¯! "
await
¯¯# ((
ValidateActiveSessionAsync
¯¯) C
(
¯¯C D
order
¯¯D I
!
¯¯I J
.
¯¯J K
TableSessionId
¯¯K Y
)
¯¯Y Z
;
¯¯Z [
if
˘˘ 
(
˘˘ 
validationResult
˘˘  
!=
˘˘! #
null
˘˘$ (
)
˘˘( )
return
˙˙ 
validationResult
˙˙ '
;
˙˙' (
order
¸¸ 
.
¸¸ 
ProductList
¸¸ 
.
¸¸ 
Clear
¸¸ #
(
¸¸# $
)
¸¸$ %
;
¸¸% &
var
˛˛ 
(
˛˛ 
failed
˛˛ 
,
˛˛ 
missingProductId
˛˛ )
)
˛˛) *
=
˛˛+ ,
await
˛˛- 2"
TryLoadProductsAsync
˛˛3 G
(
˛˛G H
order
˛˛H M
,
˛˛M N
orderRequest
˛˛O [
.
˛˛[ \
Items
˛˛\ a
)
˛˛a b
;
˛˛b c
if
ˇˇ 
(
ˇˇ 
failed
ˇˇ 
)
ˇˇ 
return
ÄÄ 
NotFound
ÄÄ 
(
ÄÄ  
$"
ÄÄ  "
$str
ÄÄ" *
{
ÄÄ* +
missingProductId
ÄÄ+ ;
}
ÄÄ; <
$str
ÄÄ< G
"
ÄÄG H
)
ÄÄH I
;
ÄÄI J
var
ÇÇ 
updatedOrder
ÇÇ 
=
ÇÇ 
await
ÇÇ $
_orderService
ÇÇ% 2
.
ÇÇ2 3
UpdateOrderAsync
ÇÇ3 C
(
ÇÇC D
order
ÇÇD I
)
ÇÇI J
;
ÇÇJ K
var
ÉÉ 
orderResponse
ÉÉ 
=
ÉÉ 
_mapper
ÉÉ  '
.
ÉÉ' (
Map
ÉÉ( +
<
ÉÉ+ ,
OrderRequest
ÉÉ, 8
>
ÉÉ8 9
(
ÉÉ9 :
updatedOrder
ÉÉ: F
)
ÉÉF G
;
ÉÉG H
return
ÖÖ 
Ok
ÖÖ 
(
ÖÖ 
orderResponse
ÖÖ #
)
ÖÖ# $
;
ÖÖ$ %
}
ÜÜ 	
catch
áá 
(
áá $
OrderNotFoundException
áá %
ex
áá& (
)
áá( )
{
àà 	
return
ââ 
NotFound
ââ 
(
ââ 
ex
ââ 
.
ââ 
Message
ââ &
)
ââ& '
;
ââ' (
}
ää 	
catch
ãã 
(
ãã 
	Exception
ãã 
ex
ãã 
)
ãã 
{
åå 	
return
çç 

StatusCode
çç 
(
çç 
$num
çç !
,
çç! "
$"
çç# %
$str
çç% <
{
çç< =
ex
çç= ?
.
çç? @
Message
çç@ G
}
ççG H
"
ççH I
)
ççI J
;
ççJ K
}
éé 	
}
èè 
[
ññ 
	Authorize
ññ 
(
ññ 
Roles
ññ 
=
ññ 
$str
ññ -
)
ññ- .
]
ññ. /
[
óó 

HttpDelete
óó 
(
óó 
$str
óó 
)
óó 
]
óó 
public
òò 

async
òò 
Task
òò 
<
òò 
IActionResult
òò #
>
òò# $
DeleteOrder
òò% 0
(
òò0 1
Guid
òò1 5
orderId
òò6 =
)
òò= >
{
ôô 
try
öö 
{
õõ 	
var
úú 
order
úú 
=
úú 
await
úú 
_orderService
úú +
.
úú+ ,
GetOrderByIdAsync
úú, =
(
úú= >
orderId
úú> E
)
úúE F
;
úúF G
var
ûû 
validationResult
ûû  
=
ûû! "
await
ûû# ((
ValidateActiveSessionAsync
ûû) C
(
ûûC D
order
ûûD I
!
ûûI J
.
ûûJ K
TableSessionId
ûûK Y
)
ûûY Z
;
ûûZ [
if
üü 
(
üü 
validationResult
üü  
!=
üü! #
null
üü$ (
)
üü( )
return
†† 
validationResult
†† '
;
††' (
await
¢¢ 
_orderService
¢¢ 
.
¢¢  
DeleteOrderAsync
¢¢  0
(
¢¢0 1
orderId
¢¢1 8
)
¢¢8 9
;
¢¢9 :
return
££ 
	NoContent
££ 
(
££ 
)
££ 
;
££ 
}
§§ 	
catch
•• 
(
•• $
OrderNotFoundException
•• %
ex
••& (
)
••( )
{
¶¶ 	
return
ßß 
NotFound
ßß 
(
ßß 
ex
ßß 
.
ßß 
Message
ßß &
)
ßß& '
;
ßß' (
}
®® 	
catch
©© 
(
©© #
OrderNotPaidException
©© $
ex
©©% '
)
©©' (
{
™™ 	
return
´´ 

BadRequest
´´ 
(
´´ 
ex
´´  
.
´´  !
Message
´´! (
)
´´( )
;
´´) *
}
¨¨ 	
catch
≠≠ 
(
≠≠ 
	Exception
≠≠ 
ex
≠≠ 
)
≠≠ 
{
ÆÆ 	
return
ØØ 

StatusCode
ØØ 
(
ØØ 
$num
ØØ !
,
ØØ! "
$"
ØØ# %
$str
ØØ% <
{
ØØ< =
ex
ØØ= ?
.
ØØ? @
Message
ØØ@ G
}
ØØG H
"
ØØH I
)
ØØI J
;
ØØJ K
}
∞∞ 	
}
±± 
private
∏∏ 
async
∏∏ 
Task
∏∏ 
<
∏∏ 
IActionResult
∏∏ $
?
∏∏$ %
>
∏∏% &(
ValidateActiveSessionAsync
∏∏' A
(
∏∏A B
Guid
∏∏B F
tableSessionId
∏∏G U
)
∏∏U V
{
ππ 
var
∫∫ 
session
∫∫ 
=
∫∫ 
await
∫∫ "
_tableSessionService
∫∫ 0
.
∫∫0 1!
GetSessionByIdAsync
∫∫1 D
(
∫∫D E
tableSessionId
∫∫E S
)
∫∫S T
;
∫∫T U
if
ªª 

(
ªª 
session
ªª 
is
ªª 
null
ªª 
)
ªª 
return
ºº 
NotFound
ºº 
(
ºº 
$str
ºº 6
)
ºº6 7
;
ºº7 8
if
ææ 

(
ææ 
!
ææ 
session
ææ 
.
ææ 
IsActive
ææ 
)
ææ 
return
øø 
Conflict
øø 
(
øø 
$str
øø h
)
øøh i
;
øøi j
return
¡¡ 
null
¡¡ 
;
¡¡ 
}
¬¬ 
private
   
async
   
Task
   
<
   
(
   
bool
   
Failed
   #
,
  # $
Guid
  % )
?
  ) *
MissingProductId
  + ;
)
  ; <
>
  < ="
TryLoadProductsAsync
  > R
(
  R S
Order
  S X
order
  Y ^
,
  ^ _
List
  ` d
<
  d e
OrderDetailItem
  e t
>
  t u
items
  v {
)
  { |
{
ÀÀ 
var
ÃÃ 

productIds
ÃÃ 
=
ÃÃ 
items
ÃÃ 
.
ÃÃ 
Select
ÃÃ %
(
ÃÃ% &
d
ÃÃ& '
=>
ÃÃ( *
d
ÃÃ+ ,
.
ÃÃ, -
	ProductId
ÃÃ- 6
)
ÃÃ6 7
.
ÃÃ7 8
Distinct
ÃÃ8 @
(
ÃÃ@ A
)
ÃÃA B
;
ÃÃB C
var
ÕÕ 
products
ÕÕ 
=
ÕÕ 
await
ÕÕ 
_productService
ÕÕ ,
.
ÕÕ, -&
GetProductListByIdsAsync
ÕÕ- E
(
ÕÕE F

productIds
ÕÕF P
)
ÕÕP Q
;
ÕÕQ R
var
ŒŒ 
productDict
ŒŒ 
=
ŒŒ 
products
ŒŒ "
.
ŒŒ" #
ToDictionary
ŒŒ# /
(
ŒŒ/ 0
p
ŒŒ0 1
=>
ŒŒ2 4
p
ŒŒ5 6
.
ŒŒ6 7
Id
ŒŒ7 9
)
ŒŒ9 :
;
ŒŒ: ;
foreach
–– 
(
–– 
var
–– 
item
–– 
in
–– 
items
–– "
)
––" #
{
—— 	
if
““ 
(
““ 
!
““ 
productDict
““ 
.
““ 
TryGetValue
““ (
(
““( )
item
““) -
.
““- .
	ProductId
““. 7
,
““7 8
out
““9 <
var
““= @
product
““A H
)
““H I
)
““I J
{
”” 
return
‘‘ 
(
‘‘ 
true
‘‘ 
,
‘‘ 
item
‘‘ "
.
‘‘" #
	ProductId
‘‘# ,
)
‘‘, -
;
‘‘- .
}
’’ 
var
◊◊ 
detail
◊◊ 
=
◊◊ 
_mapper
◊◊  
.
◊◊  !
Map
◊◊! $
<
◊◊$ %
OrderDetail
◊◊% 0
>
◊◊0 1
(
◊◊1 2
item
◊◊2 6
)
◊◊6 7
;
◊◊7 8
detail
ÿÿ 
.
ÿÿ 
Product
ÿÿ 
=
ÿÿ 
product
ÿÿ $
;
ÿÿ$ %
detail
ŸŸ 
.
ŸŸ 
	ProductId
ŸŸ 
=
ŸŸ 
product
ŸŸ &
.
ŸŸ& '
Id
ŸŸ' )
;
ŸŸ) *
detail
⁄⁄ 
.
⁄⁄ 
Order
⁄⁄ 
=
⁄⁄ 
order
⁄⁄  
;
⁄⁄  !
detail
€€ 
.
€€ 
OrderId
€€ 
=
€€ 
order
€€ "
.
€€" #
Id
€€# %
;
€€% &
order
›› 
.
›› 
ProductList
›› 
.
›› 
Add
›› !
(
››! "
detail
››" (
)
››( )
;
››) *
}
ﬁﬁ 	
return
‡‡ 
(
‡‡ 
false
‡‡ 
,
‡‡ 
null
‡‡ 
)
‡‡ 
;
‡‡ 
}
·· 
}„„ ¡\
TY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\ProductController.cs
	namespace		 	
Restaurant_Backend		
 
.		 
Controllers		 (
;		( )
[ 
Route 
( 
$str 
) 
] 
[ 
ApiController 
] 
public 
class 
ProductController 
:  
BaseController! /
{ 
private 
readonly 
IProductService $
_productService% 4
;4 5
private 
readonly 
IMapper 
_mapper $
;$ %
public 

ProductController 
( 
IProductService ,
productService- ;
,; <
IMapper= D
mapperE K
,K L 
IHttpContextAccessorM a
httpContextAccessorb u
,u v
IUserService	w É
userService
Ñ è
)
è ê
:
ë í
base
ì ó
(
ó ò!
httpContextAccessor
ò ´
,
´ ¨
userService
≠ ∏
)
∏ π
{ 
_productService 
= 
productService (
;( )
_mapper 
= 
mapper 
; 
} 
[ 
HttpGet 
] 
public 

async 
Task 
< 
IActionResult #
># $
GetAllProducts% 3
(3 4
)4 5
{ 
var   
products   
=   
await    
_productService  ! 0
.  0 1
GetAllProductsAsync  1 D
(  D E
)  E F
;  F G
return"" 
Ok"" 
("" 
products"" 
)"" 
;"" 
}## 
[)) 
HttpGet)) 
()) 
$str)) 
))) 
])) 
public** 

async** 
Task** 
<** 
IActionResult** #
>**# $ 
GetProductsAvailable**% 9
(**9 :
)**: ;
{++ 
var,, 
products,, 
=,, 
await,, 
_productService,, ,
.,,, -%
GetProductsAvailableAsync,,- F
(,,F G
),,G H
;,,H I
return.. 
Ok.. 
(.. 
products.. 
).. 
;.. 
}// 
[66 
AllowAnonymous66 
]66 
[77 
HttpGet77 
(77 
$str77 
)77  
]77  !
public88 

async88 
Task88 
<88 
IActionResult88 #
>88# $
GetProductById88% 3
(883 4
Guid884 8
	productId889 B
)88B C
{99 
try:: 
{;; 	
var<< 
product<< 
=<< 
await<< 
_productService<<  /
.<</ 0
GetProductByIdAsync<<0 C
(<<C D
	productId<<D M
)<<M N
;<<N O
if== 
(== 
product== 
is== 
null== 
)==  
return>> 
NotFound>> 
(>>  
$str>>  3
)>>3 4
;>>4 5
return@@ 
Ok@@ 
(@@ 
product@@ 
)@@ 
;@@ 
}BB 	
catchCC 
(CC 
	ExceptionCC 
)CC 
{DD 	
returnEE 

StatusCodeEE 
(EE 
$numEE !
,EE! "
$strEE# S
)EES T
;EET U
}FF 	
}HH 
[OO 
	AuthorizeOO 
(OO 
RolesOO 
=OO 
$strOO &
)OO& '
]OO' (
[PP 
HttpPostPP 
]PP 
publicQQ 

asyncQQ 
TaskQQ 
<QQ 
IActionResultQQ #
>QQ# $
CreateProductQQ% 2
(QQ2 3
[QQ3 4
FromBodyQQ4 <
]QQ< =
ProductRequestQQ> L
productRequestQQM [
)QQ[ \
{RR 
varSS 
productSS 
=SS 
_mapperSS 
.SS 
MapSS !
<SS! "
ProductSS" )
>SS) *
(SS* +
productRequestSS+ 9
)SS9 :
;SS: ;
tryUU 
{VV 	
varWW 
createdProductWW 
=WW  
awaitWW! &
_productServiceWW' 6
.WW6 7
CreateProductAsyncWW7 I
(WWI J
productWWJ Q
)WWQ R
;WWR S
varXX "
createdProductResponseXX &
=XX' (
_mapperXX) 0
.XX0 1
MapXX1 4
<XX4 5
ProductResponseXX5 D
>XXD E
(XXE F
createdProductXXF T
)XXT U
;XXU V
returnZZ 
CreatedAtActionZZ "
(ZZ" #
nameofZZ# )
(ZZ) *
GetProductByIdZZ* 8
)ZZ8 9
,ZZ9 :
newZZ; >
{ZZ? @
	productIdZZA J
=ZZK L
createdProductZZM [
.ZZ[ \
IdZZ\ ^
}ZZ_ `
,ZZ` a"
createdProductResponseZZb x
)ZZx y
;ZZy z
}[[ 	
catch\\ 
(\\ 
	Exception\\ 
)\\ 
{]] 	
return^^ 

StatusCode^^ 
(^^ 
$num^^ !
,^^! "
$str^^# Q
)^^Q R
;^^R S
}__ 	
}`` 
[hh 
	Authorizehh 
(hh 
Roleshh 
=hh 
$strhh &
)hh& '
]hh' (
[ii 
HttpPutii 
(ii 
$strii 
)ii 
]ii 
publicjj 

asyncjj 
Taskjj 
<jj 
IActionResultjj #
>jj# $
UpdateProductjj% 2
(jj2 3
Guidjj3 7
	productIdjj8 A
,jjA B
[jjC D
FromBodyjjD L
]jjL M
ProductRequestjjN \
productRequestjj] k
)jjk l
{kk 
tryll 
{mm 	
varnn 
productnn 
=nn 
awaitnn 
_productServicenn  /
.nn/ 0
GetProductByIdAsyncnn0 C
(nnC D
	productIdnnD M
)nnM N
;nnN O
ifoo 
(oo 
productoo 
isoo 
nulloo 
)oo  
returnpp 
NotFoundpp 
(pp  
$strpp  3
)pp3 4
;pp4 5
productrr 
.rr 
Pricerr 
=rr 
productRequestrr *
.rr* +
Pricerr+ 0
;rr0 1
productss 
.ss 
Namess 
=ss 
productRequestss )
.ss) *
Namess* .
;ss. /
producttt 
.tt 
Descriptiontt 
=tt  !
productRequesttt" 0
.tt0 1
Descriptiontt1 <
;tt< =
productuu 
.uu 
IsAvailableuu 
=uu  !
productRequestuu" 0
.uu0 1
IsAvailableuu1 <
;uu< =
varww 
updatedProductww 
=ww  
awaitww! &
_productServiceww' 6
.ww6 7
UpdateProductAsyncww7 I
(wwI J
productwwJ Q
)wwQ R
;wwR S
varxx 
productResponsexx 
=xx  !
_mapperxx" )
.xx) *
Mapxx* -
<xx- .
ProductResponsexx. =
>xx= >
(xx> ?
updatedProductxx? M
)xxM N
;xxN O
returnzz 
Okzz 
(zz 
productResponsezz %
)zz% &
;zz& '
}{{ 	
catch|| 
(|| 
	Exception|| 
ex|| 
)|| 
{}} 	
return~~ 

StatusCode~~ 
(~~ 
$num~~ !
,~~! "
$"~~# %
$str~~% =
{~~= >
ex~~> @
.~~@ A
Message~~A H
}~~H I
"~~I J
)~~J K
;~~K L
} 	
}
ÄÄ 
[
áá 
	Authorize
áá 
(
áá 
Roles
áá 
=
áá 
$str
áá &
)
áá& '
]
áá' (
[
àà 

HttpDelete
àà 
(
àà 
$str
àà 
)
àà 
]
àà 
public
ââ 

async
ââ 
Task
ââ 
<
ââ 
IActionResult
ââ #
>
ââ# $
DeleteProduct
ââ% 2
(
ââ2 3
Guid
ââ3 7
	productId
ââ8 A
)
ââA B
{
ää 
try
ãã 
{
åå 	
await
çç 
_productService
çç !
.
çç! " 
DeleteProductAsync
çç" 4
(
çç4 5
	productId
çç5 >
)
çç> ?
;
çç? @
return
éé 
	NoContent
éé 
(
éé 
)
éé 
;
éé 
}
èè 	
catch
êê 
(
êê 
	Exception
êê 
ex
êê 
)
êê 
{
ëë 	
return
íí 

StatusCode
íí 
(
íí 
$num
íí !
,
íí! "
$"
íí# %
$str
íí% =
{
íí= >
ex
íí> @
.
íí@ A
Message
ííA H
}
ííH I
"
ííI J
)
ííJ K
;
ííK L
}
ìì 	
}
îî 
[
úú 
	Authorize
úú 
(
úú 
Roles
úú 
=
úú 
$str
úú .
)
úú. /
]
úú/ 0
[
ùù 
	HttpPatch
ùù 
(
ùù 
$str
ùù 0
)
ùù0 1
]
ùù1 2
public
ûû 

async
ûû 
Task
ûû 
<
ûû 
IActionResult
ûû #
>
ûû# $'
ToggleProductAvailability
ûû% >
(
ûû> ?
Guid
ûû? C
	productId
ûûD M
)
ûûM N
{
üü 
try
†† 
{
°° 	
var
¢¢ 
product
¢¢ 
=
¢¢ 
await
¢¢ 
_productService
¢¢  /
.
¢¢/ 0!
GetProductByIdAsync
¢¢0 C
(
¢¢C D
	productId
¢¢D M
)
¢¢M N
;
¢¢N O
if
££ 
(
££ 
product
££ 
is
££ 
null
££ 
)
££  
return
§§ 
NotFound
§§ 
(
§§  
$str
§§  3
)
§§3 4
;
§§4 5
product
¶¶ 
.
¶¶ 
IsAvailable
¶¶ 
=
¶¶  !
!
¶¶" #
product
¶¶# *
.
¶¶* +
IsAvailable
¶¶+ 6
;
¶¶6 7
var
®® 
updatedProduct
®® 
=
®®  
await
®®! &
_productService
®®' 6
.
®®6 7 
UpdateProductAsync
®®7 I
(
®®I J
product
®®J Q
)
®®Q R
;
®®R S
var
©© 
productResponse
©© 
=
©©  !
_mapper
©©" )
.
©©) *
Map
©©* -
<
©©- .
ProductResponse
©©. =
>
©©= >
(
©©> ?
updatedProduct
©©? M
)
©©M N
;
©©N O
return
´´ 
Ok
´´ 
(
´´ 
productResponse
´´ %
)
´´% &
;
´´& '
}
¨¨ 	
catch
≠≠ 
(
≠≠ 
	Exception
≠≠ 
ex
≠≠ 
)
≠≠ 
{
ÆÆ 	
return
ØØ 

StatusCode
ØØ 
(
ØØ 
$num
ØØ !
,
ØØ! "
$"
ØØ# %
$str
ØØ% N
{
ØØN O
ex
ØØO Q
.
ØØQ R
Message
ØØR Y
}
ØØY Z
"
ØØZ [
)
ØØ[ \
;
ØØ\ ]
}
∞∞ 	
}
±± 
}≤≤ £b
RY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\TableController.cs
	namespace		 	
Restaurant_Backend		
 
.		 
Controllers		 (
;		( )
[ 
Route 
( 
$str 
) 
] 
[ 
ApiController 
] 
public 
class 
TableController 
: 
BaseController -
{ 
private 
readonly 
ITableService "
_tableService# 0
;0 1
private 
readonly 
IMapper 
_mapper $
;$ %
public 

TableController 
( 
ITableService (
tableService) 5
,5 6
IMapper7 >
mapper? E
,E F 
IHttpContextAccessorG [
httpContextAccessor\ o
,o p
IUserServiceq }
userService	~ â
)
â ä
:
ã å
base
ç ë
(
ë í!
httpContextAccessor
í •
,
• ¶
userService
ß ≤
)
≤ ≥
{ 
_tableService 
= 
tableService $
;$ %
_mapper 
= 
mapper 
; 
} 
[ 
	Authorize 
( 
Roles 
= 
$str -
)- .
]. /
[ 
HttpGet 
] 
public 

async 
Task 
< 
IActionResult #
># $
GetAllTables% 1
(1 2
)2 3
{   
try!! 
{"" 	
var## 
tables## 
=## 
await## 
_tableService## ,
.##, -
GetAllTablesAsync##- >
(##> ?
)##? @
;##@ A
return%% 
Ok%% 
(%% 
tables%% 
)%% 
;%% 
}&& 	
catch'' 
('' 
	Exception'' 
ex'' 
)'' 
{(( 	
return)) 

StatusCode)) 
()) 
$num)) !
,))! "
$"))# %
$str))% X
{))X Y
ex))Y [
.))[ \
Message))\ c
}))c d
"))d e
)))e f
;))f g
}** 	
}++ 
[22 
	Authorize22 
(22 
Roles22 
=22 
$str22 -
)22- .
]22. /
[33 
HttpGet33 
(33 
$str33 
)33 
]33 
public44 

async44 
Task44 
<44 
IActionResult44 #
>44# $
GetTableById44% 1
(441 2
Guid442 6
tableId447 >
)44> ?
{55 
try66 
{77 	
var88 
table88 
=88 
await88 
_tableService88 +
.88+ ,
GetTableByIdAsync88, =
(88= >
tableId88> E
)88E F
;88F G
return99 
Ok99 
(99 
table99 
)99 
;99 
}:: 	
catch;; 
(;; 
	Exception;; 
ex;; 
);; 
{<< 	
return== 

StatusCode== 
(== 
$num== !
,==! "
$"==# %
$str==% S
{==S T
ex==T V
.==V W
Message==W ^
}==^ _
"==_ `
)==` a
;==a b
}>> 	
}?? 
[FF 
	AuthorizeFF 
(FF 
RolesFF 
=FF 
$strFF -
)FF- .
]FF. /
[GG 
HttpGetGG 
(GG 
$strGG 
)GG 
]GG 
publicHH 

asyncHH 
TaskHH 
<HH 
IActionResultHH #
>HH# $
GetAvailableTablesHH% 7
(HH7 8
)HH8 9
{II 
tryJJ 
{KK 	
varLL 
tablesLL 
=LL 
awaitLL 
_tableServiceLL ,
.LL, -#
GetAvailableTablesAsyncLL- D
(LLD E
)LLE F
;LLF G
returnMM 
OkMM 
(MM 
tablesMM 
)MM 
;MM 
}NN 	
catchOO 
(OO 
	ExceptionOO 
exOO 
)OO 
{PP 	
returnQQ 

StatusCodeQQ 
(QQ 
$numQQ !
,QQ! "
$"QQ# %
$strQQ% Z
{QQZ [
exQQ[ ]
.QQ] ^
MessageQQ^ e
}QQe f
"QQf g
)QQg h
;QQh i
}RR 	
}SS 
[ZZ 
	AuthorizeZZ 
(ZZ 
RolesZZ 
=ZZ 
$strZZ -
)ZZ- .
]ZZ. /
[[[ 
HttpPost[[ 
][[ 
public\\ 

async\\ 
Task\\ 
<\\ 
IActionResult\\ #
>\\# $
Createtable\\% 0
(\\0 1
[\\1 2
FromBody\\2 :
]\\: ;
TableRequest\\< H
tableRequest\\I U
)\\U V
{]] 
var^^ 
table^^ 
=^^ 
_mapper^^ 
.^^ 
Map^^ 
<^^  
Table^^  %
>^^% &
(^^& '
tableRequest^^' 3
)^^3 4
;^^4 5
try`` 
{aa 	
varbb 
createdTablebb 
=bb 
awaitbb $
_tableServicebb% 2
.bb2 3
CreateTableAsyncbb3 C
(bbC D
tablebbD I
)bbI J
;bbJ K
varcc  
createdTableResponsecc $
=cc% &
_mappercc' .
.cc. /
Mapcc/ 2
<cc2 3
TableResponsecc3 @
>cc@ A
(ccA B
createdTableccB N
)ccN O
;ccO P
returnee 
CreatedAtActionee "
(ee" #
nameofee# )
(ee) *
GetTableByIdee* 6
)ee6 7
,ee7 8
newee9 <
{ee= >
tableIdee? F
=eeG H
createdTableeeI U
.eeU V
IdeeV X
}eeY Z
,eeZ [ 
createdTableResponseee\ p
)eep q
;eeq r
}ff 	
catchgg 
(gg 
	Exceptiongg 
)gg 
{hh 	
returnii 

StatusCodeii 
(ii 
$numii !
,ii! "
$strii# O
)iiO P
;iiP Q
}jj 	
}kk 
[tt 
	Authorizett 
(tt 
Rolestt 
=tt 
$strtt -
)tt- .
]tt. /
[uu 
HttpPutuu 
(uu 
$struu !
)uu! "
]uu" #
publicvv 

asyncvv 
Taskvv 
<vv 
IActionResultvv #
>vv# $
UpdatetablePositionvv% 8
(vv8 9
Guidvv9 =
tableIdvv> E
,vvE F
intvvG J
xvvK L
,vvL M
intvvN Q
yvvR S
)vvS T
{ww 
tryxx 
{yy 	
varzz 
existingtablezz 
=zz 
awaitzz  %
_tableServicezz& 3
.zz3 4
GetTableByIdAsynczz4 E
(zzE F
tableIdzzF M
)zzM N
;zzN O
if{{ 
({{ 
existingtable{{ 
is{{  
null{{! %
){{% &
return|| 
NotFound|| 
(||  
$str||  1
)||1 2
;||2 3
existingtable~~ 
.~~ 
X~~ 
=~~ 
x~~ 
;~~  
existingtable 
. 
Y 
= 
y 
;  
var
ÅÅ 
updatedtable
ÅÅ 
=
ÅÅ 
await
ÅÅ $
_tableService
ÅÅ% 2
.
ÅÅ2 3
UpdateTableAsync
ÅÅ3 C
(
ÅÅC D
existingtable
ÅÅD Q
)
ÅÅQ R
;
ÅÅR S
var
ÇÇ 
tableResponse
ÇÇ 
=
ÇÇ 
_mapper
ÇÇ  '
.
ÇÇ' (
Map
ÇÇ( +
<
ÇÇ+ ,
TableResponse
ÇÇ, 9
>
ÇÇ9 :
(
ÇÇ: ;
updatedtable
ÇÇ; G
)
ÇÇG H
;
ÇÇH I
return
ÑÑ 
Ok
ÑÑ 
(
ÑÑ 
tableResponse
ÑÑ #
)
ÑÑ# $
;
ÑÑ$ %
}
ÖÖ 	
catch
ÜÜ 
(
ÜÜ 
	Exception
ÜÜ 
ex
ÜÜ 
)
ÜÜ 
{
áá 	
return
àà 

StatusCode
àà 
(
àà 
$num
àà !
,
àà! "
$"
àà# %
$str
àà% ;
{
àà; <
ex
àà< >
.
àà> ?
Message
àà? F
}
ààF G
"
ààG H
)
ààH I
;
ààI J
}
ââ 	
}
ää 
[
íí 
	Authorize
íí 
(
íí 
Roles
íí 
=
íí 
$str
íí -
)
íí- .
]
íí. /
[
ìì 

HttpDelete
ìì 
(
ìì 
$str
ìì 
)
ìì 
]
ìì 
public
îî 

async
îî 
Task
îî 
<
îî 
IActionResult
îî #
>
îî# $
Deletetable
îî% 0
(
îî0 1
Guid
îî1 5
tableId
îî6 =
)
îî= >
{
ïï 
try
ññ 
{
óó 	
await
òò 
_tableService
òò 
.
òò  
DeleteTableAsync
òò  0
(
òò0 1
tableId
òò1 8
)
òò8 9
;
òò9 :
return
ôô 
	NoContent
ôô 
(
ôô 
)
ôô 
;
ôô 
}
öö 	
catch
õõ 
(
õõ 
	Exception
õõ 
ex
õõ 
)
õõ 
{
úú 	
return
ùù 

StatusCode
ùù 
(
ùù 
$num
ùù !
,
ùù! "
$"
ùù# %
$str
ùù% ;
{
ùù; <
ex
ùù< >
.
ùù> ?
Message
ùù? F
}
ùùF G
"
ùùG H
)
ùùH I
;
ùùI J
}
ûû 	
}
üü 
[
ßß 
	Authorize
ßß 
(
ßß 
Roles
ßß 
=
ßß 
$str
ßß -
)
ßß- .
]
ßß. /
[
®® 
	HttpPatch
®® 
(
®® 
$str
®® )
)
®®) *
]
®®* +
public
©© 

async
©© 
Task
©© 
<
©© 
IActionResult
©© #
>
©©# $ 
SetTableOccupation
©©% 7
(
©©7 8
Guid
©©8 <
tableId
©©= D
,
©©D E
[
©©F G
FromBody
©©G O
]
©©O P
bool
©©Q U

isOccupied
©©V `
)
©©` a
{
™™ 
try
´´ 
{
¨¨ 	
var
≠≠ 
existingtable
≠≠ 
=
≠≠ 
await
≠≠  %
_tableService
≠≠& 3
.
≠≠3 4
GetTableByIdAsync
≠≠4 E
(
≠≠E F
tableId
≠≠F M
)
≠≠M N
;
≠≠N O
if
ÆÆ 
(
ÆÆ 
existingtable
ÆÆ 
is
ÆÆ  
null
ÆÆ! %
)
ÆÆ% &
return
ØØ 
NotFound
ØØ 
(
ØØ  
$str
ØØ  1
)
ØØ1 2
;
ØØ2 3
existingtable
±± 
.
±± 

IsOccupied
±± $
=
±±% &

isOccupied
±±' 1
;
±±1 2
var
≥≥ 
updatedtable
≥≥ 
=
≥≥ 
await
≥≥ $
_tableService
≥≥% 2
.
≥≥2 3
UpdateTableAsync
≥≥3 C
(
≥≥C D
existingtable
≥≥D Q
)
≥≥Q R
;
≥≥R S
var
¥¥ 
tableResponse
¥¥ 
=
¥¥ 
_mapper
¥¥  '
.
¥¥' (
Map
¥¥( +
<
¥¥+ ,
TableResponse
¥¥, 9
>
¥¥9 :
(
¥¥: ;
updatedtable
¥¥; G
)
¥¥G H
;
¥¥H I
return
∂∂ 
Ok
∂∂ 
(
∂∂ 
tableResponse
∂∂ #
)
∂∂# $
;
∂∂$ %
}
∑∑ 	
catch
∏∏ 
(
∏∏ 
	Exception
∏∏ 
ex
∏∏ 
)
∏∏ 
{
ππ 	
return
∫∫ 

StatusCode
∫∫ 
(
∫∫ 
$num
∫∫ !
,
∫∫! "
$"
∫∫# %
$str
∫∫% Q
{
∫∫Q R
ex
∫∫R T
.
∫∫T U
Message
∫∫U \
}
∫∫\ ]
"
∫∫] ^
)
∫∫^ _
;
∫∫_ `
}
ªª 	
}
ºº 
}ΩΩ ûF
YY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Controllers\TableSessionController.cs
	namespace

 	
Restaurant_Backend


 
.

 
Controllers

 (
;

( )
[ 
Route 
( 
$str 
) 
] 
[ 
ApiController 
] 
public 
class "
TableSessionController #
:$ %
BaseController& 4
{ 
private  
ITableSessionService   
_tableSessionService! 5
;5 6
private 
readonly 
IMapper 
_mapper $
;$ %
private 
ITableService 
_tableService '
;' (
public 
"
TableSessionController !
(! " 
ITableSessionService" 6
tableSessionService7 J
,J K
IMapperL S
mapperT Z
,Z [
ITableService\ i
tableServicej v
,v w!
IHttpContextAccessor	x å!
httpContextAccessor
ç †
,
† °
IUserService
¢ Æ
userService
Ø ∫
)
∫ ª
:
º Ω
base
æ ¬
(
¬ √!
httpContextAccessor
√ ÷
,
÷ ◊
userService
ÿ „
)
„ ‰
{  
_tableSessionService 
= 
tableSessionService 2
;2 3
_mapper 
= 
mapper 
; 
_tableService 
= 
tableService $
;$ %
} 
[   
	Authorize   
(   
Roles   
=   
$str   -
)  - .
]  . /
[!! 
HttpGet!! 
(!! 
$str!! 
)!! 
]!! 
public"" 

async"" 
Task"" 
<"" 
IActionResult"" #
>""# $
GetSessionById""% 3
(""3 4
Guid""4 8
	sessionId""9 B
)""B C
{## 
try$$ 
{%% 	
var&& 
session&& 
=&& 
await&&  
_tableSessionService&&  4
.&&4 5
GetSessionByIdAsync&&5 H
(&&H I
	sessionId&&I R
)&&R S
;&&S T
if'' 
('' 
session'' 
is'' 
null'' 
)''  
return(( 
NotFound(( 
(((  
$str((  3
)((3 4
;((4 5
var** 
sessionResponse** 
=**  !
_mapper**" )
.**) *
Map*** -
<**- .
SessionResponse**. =
>**= >
(**> ?
session**? F
)**F G
;**G H
return,, 
Ok,, 
(,, 
sessionResponse,, %
),,% &
;,,& '
}.. 	
catch// 
(// 
	Exception// 
ex// 
)// 
{00 	
return11 

StatusCode11 
(11 
$num11 !
,11! "
$"11# %
$str11% Q
{11Q R
ex11R T
.11T U
Message11U \
}11\ ]
"11] ^
)11^ _
;11_ `
}22 	
}33 
[:: 
	Authorize:: 
(:: 
Roles:: 
=:: 
$str:: -
)::- .
]::. /
[;; 
HttpGet;; 
(;; 
);; 
];; 
public<< 

async<< 
Task<< 
<<< 
IActionResult<< #
><<# $
GetAllSessions<<% 3
(<<3 4
)<<4 5
{== 
try>> 
{?? 	
var@@ 
activeSessions@@ 
=@@  
await@@! & 
_tableSessionService@@' ;
.@@; <%
GetAllActiveSessionsAsync@@< U
(@@U V
)@@V W
;@@W X
returnAA 
OkAA 
(AA 
activeSessionsAA $
)AA$ %
;AA% &
}BB 	
catchCC 
(CC 
	ExceptionCC 
exCC 
)CC 
{DD 	
returnEE 

StatusCodeEE 
(EE 
$numEE !
,EE! "
$"EE# %
$strEE% ]
{EE] ^
exEE^ `
.EE` a
MessageEEa h
}EEh i
"EEi j
)EEj k
;EEk l
}FF 	
}GG 
[NN 
	AuthorizeNN 
(NN 
RolesNN 
=NN 
$strNN -
)NN- .
]NN. /
[OO 
HttpPostOO 
(OO 
$strOO 
)OO 
]OO 
publicPP 

asyncPP 
TaskPP 
<PP 
IActionResultPP #
>PP# $
StartSessionPP% 1
(PP1 2
[PP2 3
FromBodyPP3 ;
]PP; <
SessionRequestPP= K
sessionRequestPPL Z
)PPZ [
{QQ 
varRR 
sessionRR 
=RR 
_mapperRR 
.RR 
MapRR !
<RR! "
TableSessionRR" .
>RR. /
(RR/ 0
sessionRequestRR0 >
)RR> ?
;RR? @
tryTT 
{UU 	
varVV 
createdSessionVV 
=VV  
awaitVV! & 
_tableSessionServiceVV' ;
.VV; <
StartSessionAsyncVV< M
(VVM N
sessionVVN U
)VVU V
;VVV W
varWW "
createdSessionResponseWW &
=WW' (
_mapperWW) 0
.WW0 1
MapWW1 4
<WW4 5
SessionResponseWW5 D
>WWD E
(WWE F
createdSessionWWF T
)WWT U
;WWU V
returnYY 
CreatedAtActionYY "
(YY" #
nameofYY# )
(YY) *
GetSessionByIdYY* 8
)YY8 9
,YY9 :
newYY; >
{YY? @
	sessionIdYYA J
=YYK L
createdSessionYYM [
.YY[ \
IdYY\ ^
}YY_ `
,YY` a"
createdSessionResponseYYb x
)YYx y
;YYy z
}ZZ 	
catch[[ 
([[ 
	Exception[[ 
)[[ 
{\\ 	
return]] 

StatusCode]] 
(]] 
$num]] !
,]]! "
$str]]# Q
)]]Q R
;]]R S
}^^ 	
}__ 
[ff 
	Authorizeff 
(ff 
Rolesff 
=ff 
$strff -
)ff- .
]ff. /
[gg 

HttpDeletegg 
(gg 
$strgg !
)gg! "
]gg" #
publichh 

asynchh 
Taskhh 
<hh 
IActionResulthh #
>hh# $

EndSessionhh% /
(hh/ 0
Guidhh0 4
	sessionIdhh5 >
)hh> ?
{ii 
tryjj 
{kk 	
awaitll  
_tableSessionServicell &
.ll& '
CloseSessionAsyncll' 8
(ll8 9
	sessionIdll9 B
)llB C
;llC D
returnnn 
Oknn 
(nn 
newnn 
{nn 
messagenn #
=nn$ %
$strnn& @
}nnA B
)nnB C
;nnC D
}pp 	
catchqq 
(qq 
	Exceptionqq 
exqq 
)qq 
{rr 	
returnss 

StatusCodess 
(ss 
$numss !
,ss! "
$"ss# %
$strss% @
{ss@ A
exssA C
.ssC D
MessagessD K
}ssK L
"ssL M
)ssM N
;ssN O
}tt 	
}uu 
[|| 
	Authorize|| 
(|| 
Roles|| 
=|| 
$str|| -
)||- .
]||. /
[}} 
HttpGet}} 
(}} 
$str}} 
)}} 
]}}  
public~~ 

async~~ 
Task~~ 
<~~ 
IActionResult~~ #
>~~# $%
GetActiveSessionByTableId~~% >
(~~> ?
Guid~~? C
tableId~~D K
)~~K L
{ 
try
ÄÄ 
{
ÅÅ 	
var
ÇÇ 
activeSessions
ÇÇ 
=
ÇÇ  
await
ÇÇ! &"
_tableSessionService
ÇÇ' ;
.
ÇÇ; <,
GetActiveSessionByTableIdAsync
ÇÇ< Z
(
ÇÇZ [
tableId
ÇÇ[ b
)
ÇÇb c
;
ÇÇc d
return
ÉÉ 
Ok
ÉÉ 
(
ÉÉ 
activeSessions
ÉÉ $
)
ÉÉ$ %
;
ÉÉ% &
}
ÑÑ 	
catch
ÖÖ 
(
ÖÖ 
	Exception
ÖÖ 
ex
ÖÖ 
)
ÖÖ 
{
ÜÜ 	
return
áá 

StatusCode
áá 
(
áá 
$num
áá !
,
áá! "
$"
áá# %
$str
áá% j
{
ááj k
ex
áák m
.
áám n
Message
áán u
}
ááu v
"
ááv w
)
ááw x
;
ááx y
}
àà 	
}
ââ 
}ãã ¡
JY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\EntityBase.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
public 
abstract 
class 

EntityBase  
{ 
public 

Guid 
Id 
{ 
get 
; 
set 
; 
}  
public

 

DateTime

 
	CreatedAt

 
{

 
get

  #
;

# $
private

% ,
set

- 0
;

0 1
}

2 3
=

4 5
DateTime

6 >
.

> ?
UtcNow

? E
;

E F
} ÷
EY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\Order.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[ 
Table 
( 
$str 
) 
] 
public		 
class		 
Order		 
:		 

EntityBase		 
{

 
public 

Guid 
TableId 
{ 
get 
; 
set "
;" #
}$ %
public 

required 
Table 
Table 
{  !
get" %
;% &
set' *
;* +
}, -
public 

List 
< 
OrderDetail 
> 
ProductList (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
=7 8
[9 :
]: ;
;; <
public 

OrderStatus 
Status 
{ 
get  #
;# $
set% (
;( )
}* +
public 

Guid 
TableSessionId 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 

required 
TableSession  
TableSession! -
{. /
get0 3
;3 4
set5 8
;8 9
}: ;
[ 
	NotMapped 
] 
public 

decimal 
TotalAmountSum !
=>" $
ProductList% 0
.0 1
Sum1 4
(4 5
detail5 ;
=>< >
detail? E
.E F
QuantityF N
*O P
detailQ W
.W X
ProductX _
._ `
Price` e
)e f
;f g
[ 
Column 
( 
TypeName 
= 
$str &
)& '
]' (
public 

decimal 
TotalAmount 
{  
get" %
;% &
set' *
;* +
}, -
} 
public 
enum 
OrderStatus 
{ 
	Confirmed 
, 
	InKitchen 
, 
Ready 	
,	 

Served 

,
 
Paid 
, 	
Canceled   
}!! ¡	
KY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\OrderDetail.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[ 
Table 
( 
$str 
) 
] 
public		 
class		 
OrderDetail		 
:		 

EntityBase		 %
{

 
public 

Guid 
OrderId 
{ 
get 
; 
set "
;" #
}$ %
public 

required 
Order 
Order 
{  !
get" %
;% &
set' *
;* +
}, -
public 

Guid 
	ProductId 
{ 
get 
;  
set! $
;$ %
}& '
public 

required 
Product 
Product #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 

int 
Quantity 
{ 
get 
; 
set "
;" #
}$ %
} ›
GY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\Product.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[ 
Table 
( 
$str 
) 
] 
public		 
class		 
Product		 
:		 

EntityBase		 !
{

 
public 

string 
Name 
{ 
get 
; 
set !
;! "
}# $
=% &
string' -
.- .
Empty. 3
;3 4
public 

decimal 
Price 
{ 
get 
; 
set  #
;# $
}% &
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 

bool 
IsAvailable 
{ 
get !
;! "
set# &
;& '
}( )
} ﬂ
EY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\Table.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[ 
Table 
( 
$str 
) 
] 
public		 
class		 
Table		 
:		 

EntityBase		 
{

 
public 

int 
Number 
{ 
get 
; 
set  
;  !
}" #
public 

bool 

IsOccupied 
{ 
get  
;  !
set" %
;% &
}' (
public 

int 
X 
{ 
get 
; 
set 
; 
} 
public 

int 
Y 
{ 
get 
; 
set 
; 
} 
} ®

LY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\TableSession.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[ 
Table 
( 
$str 
) 
] 
public		 
class		 
TableSession		 
:		 

EntityBase		 &
{

 
public 

Guid 
TableId 
{ 
get 
; 
set "
;" #
}$ %
public 

required 
Table 
Table 
{  !
get" %
;% &
set' *
;* +
}, -
public 

bool 
IsActive 
{ 
get 
; 
set  #
;# $
}% &
public 

DateTime 
? 
EndTime 
{ 
get "
;" #
set$ '
;' (
}) *
public 

List 
< 
Order 
> 
Orders 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
[. /
]/ 0
;0 1
} †
DY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Entities\User.cs
	namespace 	
Restaurant_Backend
 
. 
Entities %
;% &
[		 
Table		 
(		 
$str		 
)		 
]		 
public

 
class

 
User

 
:

 

EntityBase

 
{ 
[ 
Required 
] 
public 

string 
UserName 
{ 
get  
;  !
set" %
;% &
}' (
=) *
null+ /
!/ 0
;0 1
[ 
Required 
] 
public 

string 
Password 
{ 
get  
;  !
set" %
;% &
}' (
=) *
null+ /
!/ 0
;0 1
public 

string 
	FirstName 
{ 
get !
;! "
set# &
;& '
}( )
=* +
string, 2
.2 3
Empty3 8
;8 9
public 

string 
LastName 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 

string 
Email 
{ 
get 
; 
set "
;" #
}$ %
=& '
string( .
.. /
Empty/ 4
;4 5
public 

bool 
IsActive 
{ 
get 
; 
set  #
;# $
}% &
public 

DateTime 
? 
	LastLogin 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 

Roles 
Role 
{ 
get 
; 
set  
;  !
}" #
} 
public 
enum 
Roles 
{ 
Admin 	
,	 

Manager 
, 
Waiter 

,
 
Kitchen 
} Íõ
_Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20250429041635_FirstMigration.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public		 

partial		 
class		 
FirstMigration		 '
:		( )
	Migration		* 3
{

 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 
CreateTable (
(( )
name 
: 
$str  
,  !
columns 
: 
table 
=> !
new" %
{ 
Id 
= 
table 
. 
Column %
<% &
Guid& *
>* +
(+ ,
type, 0
:0 1
$str2 8
,8 9
nullable: B
:B C
falseD I
)I J
,J K
Name 
= 
table  
.  !
Column! '
<' (
string( .
>. /
(/ 0
type0 4
:4 5
$str6 <
,< =
nullable> F
:F G
falseH M
)M N
,N O
Price 
= 
table !
.! "
Column" (
<( )
decimal) 0
>0 1
(1 2
type2 6
:6 7
$str8 A
,A B
nullableC K
:K L
falseM R
)R S
,S T
Description 
=  !
table" '
.' (
Column( .
<. /
string/ 5
>5 6
(6 7
type7 ;
:; <
$str= C
,C D
nullableE M
:M N
trueO S
)S T
,T U
IsAvailable 
=  !
table" '
.' (
Column( .
<. /
bool/ 3
>3 4
(4 5
type5 9
:9 :
$str; D
,D E
nullableF N
:N O
falseP U
)U V
,V W
	CreatedAt 
= 
table  %
.% &
Column& ,
<, -
DateTime- 5
>5 6
(6 7
type7 ;
:; <
$str= W
,W X
nullableY a
:a b
falsec h
)h i
} 
, 
constraints 
: 
table "
=># %
{ 
table 
. 

PrimaryKey $
($ %
$str% 2
,2 3
x4 5
=>6 8
x9 :
.: ;
Id; =
)= >
;> ?
} 
) 
; 
migrationBuilder 
. 
CreateTable (
(( )
name 
: 
$str 
, 
columns   
:   
table   
=>   !
new  " %
{!! 
Id"" 
="" 
table"" 
."" 
Column"" %
<""% &
Guid""& *
>""* +
(""+ ,
type"", 0
:""0 1
$str""2 8
,""8 9
nullable"": B
:""B C
false""D I
)""I J
,""J K
Number## 
=## 
table## "
.##" #
Column### )
<##) *
string##* 0
>##0 1
(##1 2
type##2 6
:##6 7
$str##8 >
,##> ?
nullable##@ H
:##H I
false##J O
)##O P
,##P Q

IsOccupied$$ 
=$$  
table$$! &
.$$& '
Column$$' -
<$$- .
bool$$. 2
>$$2 3
($$3 4
type$$4 8
:$$8 9
$str$$: C
,$$C D
nullable$$E M
:$$M N
false$$O T
)$$T U
,$$U V
	CreatedAt%% 
=%% 
table%%  %
.%%% &
Column%%& ,
<%%, -
DateTime%%- 5
>%%5 6
(%%6 7
type%%7 ;
:%%; <
$str%%= W
,%%W X
nullable%%Y a
:%%a b
false%%c h
)%%h i
}&& 
,&& 
constraints'' 
:'' 
table'' "
=>''# %
{(( 
table)) 
.)) 

PrimaryKey)) $
())$ %
$str))% 0
,))0 1
x))2 3
=>))4 6
x))7 8
.))8 9
Id))9 ;
))); <
;))< =
}** 
)** 
;** 
migrationBuilder,, 
.,, 
CreateTable,, (
(,,( )
name-- 
:-- 
$str-- 
,-- 
columns.. 
:.. 
table.. 
=>.. !
new.." %
{// 
Id00 
=00 
table00 
.00 
Column00 %
<00% &
Guid00& *
>00* +
(00+ ,
type00, 0
:000 1
$str002 8
,008 9
nullable00: B
:00B C
false00D I
)00I J
,00J K
UserName11 
=11 
table11 $
.11$ %
Column11% +
<11+ ,
string11, 2
>112 3
(113 4
type114 8
:118 9
$str11: @
,11@ A
nullable11B J
:11J K
false11L Q
)11Q R
,11R S
Password22 
=22 
table22 $
.22$ %
Column22% +
<22+ ,
string22, 2
>222 3
(223 4
type224 8
:228 9
$str22: @
,22@ A
nullable22B J
:22J K
false22L Q
)22Q R
,22R S
Name33 
=33 
table33  
.33  !
Column33! '
<33' (
string33( .
>33. /
(33/ 0
type330 4
:334 5
$str336 <
,33< =
nullable33> F
:33F G
false33H M
)33M N
,33N O
	CreatedAt44 
=44 
table44  %
.44% &
Column44& ,
<44, -
DateTime44- 5
>445 6
(446 7
type447 ;
:44; <
$str44= W
,44W X
nullable44Y a
:44a b
false44c h
)44h i
}55 
,55 
constraints66 
:66 
table66 "
=>66# %
{77 
table88 
.88 

PrimaryKey88 $
(88$ %
$str88% /
,88/ 0
x881 2
=>883 5
x886 7
.887 8
Id888 :
)88: ;
;88; <
}99 
)99 
;99 
migrationBuilder;; 
.;; 
CreateTable;; (
(;;( )
name<< 
:<< 
$str<< %
,<<% &
columns== 
:== 
table== 
=>== !
new==" %
{>> 
Id?? 
=?? 
table?? 
.?? 
Column?? %
<??% &
Guid??& *
>??* +
(??+ ,
type??, 0
:??0 1
$str??2 8
,??8 9
nullable??: B
:??B C
false??D I
)??I J
,??J K
TableId@@ 
=@@ 
table@@ #
.@@# $
Column@@$ *
<@@* +
Guid@@+ /
>@@/ 0
(@@0 1
type@@1 5
:@@5 6
$str@@7 =
,@@= >
nullable@@? G
:@@G H
false@@I N
)@@N O
,@@O P
	StartTimeAA 
=AA 
tableAA  %
.AA% &
ColumnAA& ,
<AA, -
DateTimeAA- 5
>AA5 6
(AA6 7
typeAA7 ;
:AA; <
$strAA= W
,AAW X
nullableAAY a
:AAa b
falseAAc h
)AAh i
,AAi j
EndTimeBB 
=BB 
tableBB #
.BB# $
ColumnBB$ *
<BB* +
DateTimeBB+ 3
>BB3 4
(BB4 5
typeBB5 9
:BB9 :
$strBB; U
,BBU V
nullableBBW _
:BB_ `
trueBBa e
)BBe f
,BBf g
	CreatedAtCC 
=CC 
tableCC  %
.CC% &
ColumnCC& ,
<CC, -
DateTimeCC- 5
>CC5 6
(CC6 7
typeCC7 ;
:CC; <
$strCC= W
,CCW X
nullableCCY a
:CCa b
falseCCc h
)CCh i
}DD 
,DD 
constraintsEE 
:EE 
tableEE "
=>EE# %
{FF 
tableGG 
.GG 

PrimaryKeyGG $
(GG$ %
$strGG% 7
,GG7 8
xGG9 :
=>GG; =
xGG> ?
.GG? @
IdGG@ B
)GGB C
;GGC D
tableHH 
.HH 

ForeignKeyHH $
(HH$ %
nameII 
:II 
$strII ?
,II? @
columnJJ 
:JJ 
xJJ  !
=>JJ" $
xJJ% &
.JJ& '
TableIdJJ' .
,JJ. /
principalTableKK &
:KK& '
$strKK( 0
,KK0 1
principalColumnLL '
:LL' (
$strLL) -
,LL- .
onDeleteMM  
:MM  !
ReferentialActionMM" 3
.MM3 4
CascadeMM4 ;
)MM; <
;MM< =
}NN 
)NN 
;NN 
migrationBuilderPP 
.PP 
CreateTablePP (
(PP( )
nameQQ 
:QQ 
$strQQ 
,QQ 
columnsRR 
:RR 
tableRR 
=>RR !
newRR" %
{SS 
IdTT 
=TT 
tableTT 
.TT 
ColumnTT %
<TT% &
GuidTT& *
>TT* +
(TT+ ,
typeTT, 0
:TT0 1
$strTT2 8
,TT8 9
nullableTT: B
:TTB C
falseTTD I
)TTI J
,TTJ K
TableIdUU 
=UU 
tableUU #
.UU# $
ColumnUU$ *
<UU* +
GuidUU+ /
>UU/ 0
(UU0 1
typeUU1 5
:UU5 6
$strUU7 =
,UU= >
nullableUU? G
:UUG H
falseUUI N
)UUN O
,UUO P
IsPaidVV 
=VV 
tableVV "
.VV" #
ColumnVV# )
<VV) *
boolVV* .
>VV. /
(VV/ 0
typeVV0 4
:VV4 5
$strVV6 ?
,VV? @
nullableVVA I
:VVI J
falseVVK P
)VVP Q
,VVQ R
StatusWW 
=WW 
tableWW "
.WW" #
ColumnWW# )
<WW) *
intWW* -
>WW- .
(WW. /
typeWW/ 3
:WW3 4
$strWW5 >
,WW> ?
nullableWW@ H
:WWH I
falseWWJ O
)WWO P
,WWP Q
TableSessionIdXX "
=XX# $
tableXX% *
.XX* +
ColumnXX+ 1
<XX1 2
GuidXX2 6
>XX6 7
(XX7 8
typeXX8 <
:XX< =
$strXX> D
,XXD E
nullableXXF N
:XXN O
falseXXP U
)XXU V
,XXV W
TotalAmountHistoryYY &
=YY' (
tableYY) .
.YY. /
ColumnYY/ 5
<YY5 6
decimalYY6 =
>YY= >
(YY> ?
typeYY? C
:YYC D
$strYYE N
,YYN O
nullableYYP X
:YYX Y
falseYYZ _
)YY_ `
,YY` a
	CreatedAtZZ 
=ZZ 
tableZZ  %
.ZZ% &
ColumnZZ& ,
<ZZ, -
DateTimeZZ- 5
>ZZ5 6
(ZZ6 7
typeZZ7 ;
:ZZ; <
$strZZ= W
,ZZW X
nullableZZY a
:ZZa b
falseZZc h
)ZZh i
}[[ 
,[[ 
constraints\\ 
:\\ 
table\\ "
=>\\# %
{]] 
table^^ 
.^^ 

PrimaryKey^^ $
(^^$ %
$str^^% 0
,^^0 1
x^^2 3
=>^^4 6
x^^7 8
.^^8 9
Id^^9 ;
)^^; <
;^^< =
table__ 
.__ 

ForeignKey__ $
(__$ %
name`` 
:`` 
$str`` F
,``F G
columnaa 
:aa 
xaa  !
=>aa" $
xaa% &
.aa& '
TableSessionIdaa' 5
,aa5 6
principalTablebb &
:bb& '
$strbb( 7
,bb7 8
principalColumncc '
:cc' (
$strcc) -
,cc- .
onDeletedd  
:dd  !
ReferentialActiondd" 3
.dd3 4
Cascadedd4 ;
)dd; <
;dd< =
tableee 
.ee 

ForeignKeyee $
(ee$ %
nameff 
:ff 
$strff 8
,ff8 9
columngg 
:gg 
xgg  !
=>gg" $
xgg% &
.gg& '
TableIdgg' .
,gg. /
principalTablehh &
:hh& '
$strhh( 0
,hh0 1
principalColumnii '
:ii' (
$strii) -
,ii- .
onDeletejj  
:jj  !
ReferentialActionjj" 3
.jj3 4
Cascadejj4 ;
)jj; <
;jj< =
}kk 
)kk 
;kk 
migrationBuildermm 
.mm 
CreateTablemm (
(mm( )
namenn 
:nn 
$strnn $
,nn$ %
columnsoo 
:oo 
tableoo 
=>oo !
newoo" %
{pp 
Idqq 
=qq 
tableqq 
.qq 
Columnqq %
<qq% &
Guidqq& *
>qq* +
(qq+ ,
typeqq, 0
:qq0 1
$strqq2 8
,qq8 9
nullableqq: B
:qqB C
falseqqD I
)qqI J
,qqJ K
OrderIdrr 
=rr 
tablerr #
.rr# $
Columnrr$ *
<rr* +
Guidrr+ /
>rr/ 0
(rr0 1
typerr1 5
:rr5 6
$strrr7 =
,rr= >
nullablerr? G
:rrG H
falserrI N
)rrN O
,rrO P
	ProductIdss 
=ss 
tabless  %
.ss% &
Columnss& ,
<ss, -
Guidss- 1
>ss1 2
(ss2 3
typess3 7
:ss7 8
$strss9 ?
,ss? @
nullablessA I
:ssI J
falsessK P
)ssP Q
,ssQ R
Quantitytt 
=tt 
tablett $
.tt$ %
Columntt% +
<tt+ ,
inttt, /
>tt/ 0
(tt0 1
typett1 5
:tt5 6
$strtt7 @
,tt@ A
nullablettB J
:ttJ K
falsettL Q
)ttQ R
,ttR S
	CreatedAtuu 
=uu 
tableuu  %
.uu% &
Columnuu& ,
<uu, -
DateTimeuu- 5
>uu5 6
(uu6 7
typeuu7 ;
:uu; <
$struu= W
,uuW X
nullableuuY a
:uua b
falseuuc h
)uuh i
}vv 
,vv 
constraintsww 
:ww 
tableww "
=>ww# %
{xx 
tableyy 
.yy 

PrimaryKeyyy $
(yy$ %
$stryy% 6
,yy6 7
xyy8 9
=>yy: <
xyy= >
.yy> ?
Idyy? A
)yyA B
;yyB C
tablezz 
.zz 

ForeignKeyzz $
(zz$ %
name{{ 
:{{ 
$str{{ >
,{{> ?
column|| 
:|| 
x||  !
=>||" $
x||% &
.||& '
OrderId||' .
,||. /
principalTable}} &
:}}& '
$str}}( 0
,}}0 1
principalColumn~~ '
:~~' (
$str~~) -
,~~- .
onDelete  
:  !
ReferentialAction" 3
.3 4
Cascade4 ;
); <
;< =
table
ÄÄ 
.
ÄÄ 

ForeignKey
ÄÄ $
(
ÄÄ$ %
name
ÅÅ 
:
ÅÅ 
$str
ÅÅ B
,
ÅÅB C
column
ÇÇ 
:
ÇÇ 
x
ÇÇ  !
=>
ÇÇ" $
x
ÇÇ% &
.
ÇÇ& '
	ProductId
ÇÇ' 0
,
ÇÇ0 1
principalTable
ÉÉ &
:
ÉÉ& '
$str
ÉÉ( 2
,
ÉÉ2 3
principalColumn
ÑÑ '
:
ÑÑ' (
$str
ÑÑ) -
,
ÑÑ- .
onDelete
ÖÖ  
:
ÖÖ  !
ReferentialAction
ÖÖ" 3
.
ÖÖ3 4
Cascade
ÖÖ4 ;
)
ÖÖ; <
;
ÖÖ< =
}
ÜÜ 
)
ÜÜ 
;
ÜÜ 
migrationBuilder
àà 
.
àà 
CreateIndex
àà (
(
àà( )
name
ââ 
:
ââ 
$str
ââ /
,
ââ/ 0
table
ää 
:
ää 
$str
ää %
,
ää% &
column
ãã 
:
ãã 
$str
ãã !
)
ãã! "
;
ãã" #
migrationBuilder
çç 
.
çç 
CreateIndex
çç (
(
çç( )
name
éé 
:
éé 
$str
éé 1
,
éé1 2
table
èè 
:
èè 
$str
èè %
,
èè% &
column
êê 
:
êê 
$str
êê #
)
êê# $
;
êê$ %
migrationBuilder
íí 
.
íí 
CreateIndex
íí (
(
íí( )
name
ìì 
:
ìì 
$str
ìì )
,
ìì) *
table
îî 
:
îî 
$str
îî 
,
îî  
column
ïï 
:
ïï 
$str
ïï !
)
ïï! "
;
ïï" #
migrationBuilder
óó 
.
óó 
CreateIndex
óó (
(
óó( )
name
òò 
:
òò 
$str
òò 0
,
òò0 1
table
ôô 
:
ôô 
$str
ôô 
,
ôô  
column
öö 
:
öö 
$str
öö (
)
öö( )
;
öö) *
migrationBuilder
úú 
.
úú 
CreateIndex
úú (
(
úú( )
name
ùù 
:
ùù 
$str
ùù 0
,
ùù0 1
table
ûû 
:
ûû 
$str
ûû &
,
ûû& '
column
üü 
:
üü 
$str
üü !
)
üü! "
;
üü" #
}
†† 	
	protected
££ 
override
££ 
void
££ 
Down
££  $
(
££$ %
MigrationBuilder
££% 5
migrationBuilder
££6 F
)
££F G
{
§§ 	
migrationBuilder
•• 
.
•• 
	DropTable
•• &
(
••& '
name
¶¶ 
:
¶¶ 
$str
¶¶ $
)
¶¶$ %
;
¶¶% &
migrationBuilder
®® 
.
®® 
	DropTable
®® &
(
®®& '
name
©© 
:
©© 
$str
©© 
)
©© 
;
©© 
migrationBuilder
´´ 
.
´´ 
	DropTable
´´ &
(
´´& '
name
¨¨ 
:
¨¨ 
$str
¨¨ 
)
¨¨ 
;
¨¨  
migrationBuilder
ÆÆ 
.
ÆÆ 
	DropTable
ÆÆ &
(
ÆÆ& '
name
ØØ 
:
ØØ 
$str
ØØ  
)
ØØ  !
;
ØØ! "
migrationBuilder
±± 
.
±± 
	DropTable
±± &
(
±±& '
name
≤≤ 
:
≤≤ 
$str
≤≤ %
)
≤≤% &
;
≤≤& '
migrationBuilder
¥¥ 
.
¥¥ 
	DropTable
¥¥ &
(
¥¥& '
name
µµ 
:
µµ 
$str
µµ 
)
µµ 
;
µµ  
}
∂∂ 	
}
∑∑ 
}∏∏ å
aY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20250604233758_ChangeOnEntities.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public		 

partial		 
class		 
ChangeOnEntities		 )
:		* +
	Migration		, 5
{

 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 

DropColumn '
(' (
name 
: 
$str !
,! "
table 
: 
$str &
)& '
;' (
migrationBuilder 
. 
	AddColumn &
<& '
bool' +
>+ ,
(, -
name 
: 
$str  
,  !
table 
: 
$str &
,& '
type 
: 
$str 
,  
nullable 
: 
false 
,  
defaultValue 
: 
false #
)# $
;$ %
} 	
	protected 
override 
void 
Down  $
($ %
MigrationBuilder% 5
migrationBuilder6 F
)F G
{ 	
migrationBuilder 
. 

DropColumn '
(' (
name 
: 
$str  
,  !
table 
: 
$str &
)& '
;' (
migrationBuilder!! 
.!! 
	AddColumn!! &
<!!& '
DateTime!!' /
>!!/ 0
(!!0 1
name"" 
:"" 
$str"" !
,""! "
table## 
:## 
$str## &
,##& '
type$$ 
:$$ 
$str$$ 0
,$$0 1
nullable%% 
:%% 
false%% 
,%%  
defaultValue&& 
:&& 
new&& !
DateTime&&" *
(&&* +
$num&&+ ,
,&&, -
$num&&. /
,&&/ 0
$num&&1 2
,&&2 3
$num&&4 5
,&&5 6
$num&&7 8
,&&8 9
$num&&: ;
,&&; <
$num&&= >
,&&> ?
DateTimeKind&&@ L
.&&L M
Unspecified&&M X
)&&X Y
)&&Y Z
;&&Z [
}'' 	
}(( 
})) …
iY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20250613214720_ChangeValueOnTableEntity.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public 

partial 
class $
ChangeValueOnTableEntity 1
:2 3
	Migration4 =
{		 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 

DropColumn '
(' (
name 
: 
$str 
, 
table 
: 
$str 
)  
;  !
migrationBuilder 
. 
Sql  
(  !
$str h
)h i
;i j
} 	
	protected 
override 
void 
Down  $
($ %
MigrationBuilder% 5
migrationBuilder6 F
)F G
{ 	
migrationBuilder 
. 
AlterColumn (
<( )
string) /
>/ 0
(0 1
name 
: 
$str 
, 
table 
: 
$str 
,  
type 
: 
$str 
, 
nullable 
: 
false 
,  

oldClrType 
: 
typeof "
(" #
int# &
)& '
,' (
oldType 
: 
$str "
)" #
;# $
migrationBuilder!! 
.!! 
	AddColumn!! &
<!!& '
bool!!' +
>!!+ ,
(!!, -
name"" 
:"" 
$str"" 
,"" 
table## 
:## 
$str## 
,##  
type$$ 
:$$ 
$str$$ 
,$$  
nullable%% 
:%% 
false%% 
,%%  
defaultValue&& 
:&& 
false&& #
)&&# $
;&&$ %
}'' 	
}(( 
})) ¥&
]Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20250619031908_CreatingUser.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public		 

partial		 
class		 
CreatingUser		 %
:		& '
	Migration		( 1
{

 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 
RenameColumn )
() *
name 
: 
$str 
, 
table 
: 
$str 
, 
newName 
: 
$str #
)# $
;$ %
migrationBuilder 
. 
	AddColumn &
<& '
string' -
>- .
(. /
name 
: 
$str 
, 
table 
: 
$str 
, 
type 
: 
$str 
, 
nullable 
: 
false 
,  
defaultValue 
: 
$str  
)  !
;! "
migrationBuilder 
. 
	AddColumn &
<& '
string' -
>- .
(. /
name 
: 
$str !
,! "
table 
: 
$str 
, 
type 
: 
$str 
, 
nullable 
: 
false 
,  
defaultValue 
: 
$str  
)  !
;! "
migrationBuilder!! 
.!! 
	AddColumn!! &
<!!& '
bool!!' +
>!!+ ,
(!!, -
name"" 
:"" 
$str""  
,""  !
table## 
:## 
$str## 
,## 
type$$ 
:$$ 
$str$$ 
,$$  
nullable%% 
:%% 
false%% 
,%%  
defaultValue&& 
:&& 
false&& #
)&&# $
;&&$ %
migrationBuilder(( 
.(( 
	AddColumn(( &
<((& '
DateTime((' /
>((/ 0
(((0 1
name)) 
:)) 
$str)) !
,))! "
table** 
:** 
$str** 
,** 
type++ 
:++ 
$str++ 0
,++0 1
nullable,, 
:,, 
true,, 
),, 
;,,  
migrationBuilder.. 
... 
	AddColumn.. &
<..& '
int..' *
>..* +
(..+ ,
name// 
:// 
$str// 
,// 
table00 
:00 
$str00 
,00 
type11 
:11 
$str11 
,11  
nullable22 
:22 
false22 
,22  
defaultValue33 
:33 
$num33 
)33  
;33  !
}44 	
	protected77 
override77 
void77 
Down77  $
(77$ %
MigrationBuilder77% 5
migrationBuilder776 F
)77F G
{88 	
migrationBuilder99 
.99 

DropColumn99 '
(99' (
name:: 
::: 
$str:: 
,:: 
table;; 
:;; 
$str;; 
);; 
;;;  
migrationBuilder== 
.== 

DropColumn== '
(==' (
name>> 
:>> 
$str>> !
,>>! "
table?? 
:?? 
$str?? 
)?? 
;??  
migrationBuilderAA 
.AA 

DropColumnAA '
(AA' (
nameBB 
:BB 
$strBB  
,BB  !
tableCC 
:CC 
$strCC 
)CC 
;CC  
migrationBuilderEE 
.EE 

DropColumnEE '
(EE' (
nameFF 
:FF 
$strFF !
,FF! "
tableGG 
:GG 
$strGG 
)GG 
;GG  
migrationBuilderII 
.II 

DropColumnII '
(II' (
nameJJ 
:JJ 
$strJJ 
,JJ 
tableKK 
:KK 
$strKK 
)KK 
;KK  
migrationBuilderMM 
.MM 
RenameColumnMM )
(MM) *
nameNN 
:NN 
$strNN  
,NN  !
tableOO 
:OO 
$strOO 
,OO 
newNamePP 
:PP 
$strPP 
)PP  
;PP  !
}QQ 	
}RR 
}SS ü
\Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20251003041259_UpdateTable.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public 

partial 
class 
UpdateTable $
:% &
	Migration' 0
{		 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 
	AddColumn &
<& '
int' *
>* +
(+ ,
name 
: 
$str 
, 
table 
: 
$str 
,  
type 
: 
$str 
,  
nullable 
: 
false 
,  
defaultValue 
: 
$num 
)  
;  !
migrationBuilder 
. 
	AddColumn &
<& '
int' *
>* +
(+ ,
name 
: 
$str 
, 
table 
: 
$str 
,  
type 
: 
$str 
,  
nullable 
: 
false 
,  
defaultValue 
: 
$num 
)  
;  !
} 	
	protected 
override 
void 
Down  $
($ %
MigrationBuilder% 5
migrationBuilder6 F
)F G
{ 	
migrationBuilder 
. 

DropColumn '
(' (
name   
:   
$str   
,   
table!! 
:!! 
$str!! 
)!!  
;!!  !
migrationBuilder## 
.## 

DropColumn## '
(##' (
name$$ 
:$$ 
$str$$ 
,$$ 
table%% 
:%% 
$str%% 
)%%  
;%%  !
}&& 	
}'' 
}(( µ
fY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Migrations\20251104170831_ChangedOrderPropertie.cs
	namespace 	
Restaurant_Backend
 
. 

Migrations '
{ 
public 

partial 
class !
ChangedOrderPropertie .
:/ 0
	Migration1 :
{		 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 
	AddColumn &
<& '
decimal' .
>. /
(/ 0
name 
: 
$str #
,# $
table 
: 
$str 
,  
type 
: 
$str %
,% &
nullable 
: 
false 
,  
defaultValue 
: 
$num  
)  !
;! "
migrationBuilder 
. 
Sql  
(  !
$str! b
)b c
;c d
migrationBuilder 
. 

DropColumn '
(' (
name 
: 
$str *
,* +
table 
: 
$str 
)  
;  !
} 	
	protected 
override 
void 
Down  $
($ %
MigrationBuilder% 5
migrationBuilder6 F
)F G
{ 	
migrationBuilder 
. 
	AddColumn &
<& '
decimal' .
>. /
(/ 0
name   
:   
$str   *
,  * +
table!! 
:!! 
$str!! 
,!!  
type"" 
:"" 
$str"" %
,""% &
nullable## 
:## 
false## 
,##  
defaultValue$$ 
:$$ 
$num$$  
)$$  !
;$$! "
migrationBuilder&& 
.&& 
Sql&&  
(&&  !
$str&&! b
)&&b c
;&&c d
migrationBuilder(( 
.(( 

DropColumn(( '
(((' (
name)) 
:)) 
$str)) #
,))# $
table** 
:** 
$str** 
)**  
;**  !
}++ 	
},, 
}-- ¨
ZY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Authentication\AccessRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Authentication$ 2
;2 3
public 
class 
AccessRequest 
{ 
public 

required 
string 
UserName #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 

required 
string 
Password #
{$ %
get& )
;) *
set+ .
;. /
}0 1
} Ò
cY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Authentication\AuthenticationResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Authentication$ 2
;2 3
public 
class "
AuthenticationResponse #
{ 
public 
"
AuthenticationResponse !
(! "
string" (
userName) 1
,1 2
string3 9
token: ?
)? @
{ 
UserName 
= 
userName 
; 
Token 
= 
token 
; 
} 
public 

string 
UserName 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
Token 
{ 
get 
; 
set "
;" #
}$ %
} ˚
XY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Authentication\JwtSettings.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Authentication$ 2
;2 3
public 
class 
JwtSettings 
{ 
public 

string 
Issuer 
{ 
get 
; 
set  #
;# $
}% &
public 

string 
	SecretKey 
{ 
get !
;! "
set# &
;& '
}( )
} °
`Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Authentication\RegisterUserRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Authentication$ 2
;2 3
public 
class 
RegisterUserRequest  
{ 
public 

required 
string 
UserName #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public		 

required		 
string		 
Password		 #
{		$ %
get		& )
;		) *
set		+ .
;		. /
}		0 1
public 

required 
string 
	FirstName $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 

required 
string 
LastName #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 

string 
Email 
{ 
get 
; 
set "
;" #
}$ %
=& '
string( .
.. /
Empty/ 4
;4 5
public 

Roles 
Role 
{ 
get 
; 
set  
;  !
}" #
} è	
^Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Authentication\UpdateUserRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Authentication$ 2
;2 3
public 
class 
UpdateUserRequest 
{ 
public 

string 
? 
	FirstName 
{ 
get "
;" #
set$ '
;' (
}) *
public 

string 
? 
LastName 
{ 
get !
;! "
set# &
;& '
}( )
public		 

string		 
?		 
Email		 
{		 
get		 
;		 
set		  #
;		# $
}		% &
public

 

Roles

 
?

 
Role

 
{

 
get

 
;

 
set

 !
;

! "
}

# $
public 

bool 
IsActive 
{ 
get 
; 
set  #
;# $
}% &
} Ç
\Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\OrderDetail\OrderDetailRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
OrderDetail$ /
;/ 0
public 
class 
OrderDetailRequest 
{ 
public 

List 
< 
OrderDetailItem 
>  
ProductItems! -
{. /
get0 3
;3 4
set5 8
;8 9
}: ;
=< =
new> A
(A B
)B C
;C D
} 
public 
class 
OrderDetailItem 
{		 
public

 

Guid

 
	ProductId

 
{

 
get

 
;

  
set

! $
;

$ %
}

& '
public 

int 
Quantity 
{ 
get 
; 
set "
;" #
}$ %
} ·

]Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\OrderDetail\OrderDetailResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
OrderDetail$ /
;/ 0
public 
class 
OrderDetailResponse  
{ 
public 

Guid 
	ProductId 
{ 
get 
;  
set! $
;$ %
}& '
public 

string 
ProductName 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
string. 4
.4 5
Empty5 :
;: ;
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 

decimal 
	UnitPrice 
{ 
get "
;" #
set$ '
;' (
}) *
public		 

int		 
Quantity		 
{		 
get		 
;		 
set		 "
;		" #
}		$ %
public

 

Guid

 
TableSessionId

 
{

  
get

! $
;

$ %
set

& )
;

) *
}

+ ,
} Ï
PY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Order\OrderRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Order$ )
;) *
public 
class 
OrderRequest 
{ 
public 

Guid 
TableId 
{ 
get 
; 
set "
;" #
}$ %
public 

List 
< 
OrderDetailItem 
>  
Items! &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
=5 6
new7 :
(: ;
); <
;< =
} Ã
QY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Order\OrderResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Order$ )
;) *
public 
class 
OrderResponse 
{ 
public 

Guid 
Id 
{ 
get 
; 
set 
; 
}  
public		 

Guid		 
TableId		 
{		 
get		 
;		 
set		 "
;		" #
}		$ %
public

 

DateTime

 
	CreatedAt

 
{

 
get

  #
;

# $
set

% (
;

( )
}

* +
public 

OrderStatus 
Status 
{ 
get  #
;# $
set% (
;( )
}* +
public 

List 
< 
OrderDetailResponse #
># $
ProductList% 0
{1 2
get3 6
;6 7
set8 ;
;; <
}= >
=? @
[A B
]B C
;C D
public 

string 
TableNumber 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
string. 4
.4 5
Empty5 :
;: ;
public 

decimal 
TotalAmount 
{  
get! $
;$ %
set& )
;) *
}+ ,
} ç
TY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Product\ProductRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Product$ +
;+ ,
public 
class 
ProductRequest 
{ 
public 

string 
Name 
{ 
get 
; 
set !
;! "
}# $
=% &
string' -
.- .
Empty. 3
;3 4
public 

decimal 
Price 
{ 
get 
; 
set  #
;# $
}% &
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 

bool 
IsAvailable 
{ 
get !
;! "
set# &
;& '
}( )
}		 £	
UY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Product\ProductResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Product$ +
;+ ,
public 
class 
ProductResponse 
{ 
public 

Guid 
Id 
{ 
get 
; 
set 
; 
}  
public 

string 
Name 
{ 
get 
; 
set !
;! "
}# $
=% &
string' -
.- .
Empty. 3
;3 4
public 

decimal 
Price 
{ 
get 
; 
set  #
;# $
}% &
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
public		 

bool		 
IsAvailable		 
{		 
get		 !
;		! "
set		# &
;		& '
}		( )
}

 ﬂ
YY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\TableSession\SessionRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
TableSession$ 0
;0 1
public 
class 
SessionRequest 
{ 
public 

Guid 
TableId 
{ 
get 
; 
set "
;" #
}$ %
} ¥
ZY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\TableSession\SessionResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
TableSession$ 0
;0 1
public 
class 
SessionResponse 
{ 
public 

Guid 
TableId 
{ 
get 
; 
set "
;" #
}$ %
public 

bool 
IsActive 
{ 
get 
; 
set  #
;# $
}% &
public		 

DateTime		 
?		 
EndTime		 
{		 
get		 "
;		" #
set		$ '
;		' (
}		) *
public

 

List

 
<

 
OrderResponse

 
>

 
Orders

 %
{

& '
get

( +
;

+ ,
set

- 0
;

0 1
}

2 3
=

4 5
[

6 7
]

7 8
;

8 9
} ã
PY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Table\TableRequest.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Table$ )
;) *
public 
class 
TableRequest 
{ 
public 

int 
Number 
{ 
get 
; 
set  
;  !
}" #
public 

bool 

IsOccupied 
{ 
get  
;  !
set" %
;% &
}' (
public 

int 
x 
{ 
get 
; 
set 
; 
} 
public 

int 
y 
{ 
get 
; 
set 
; 
} 
}		 °
QY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Models\Table\TableResponse.cs
	namespace 	
Restaurant_Backend
 
. 
Models #
.# $
Table$ )
;) *
public 
class 
TableResponse 
{ 
public 

Guid 
Id 
{ 
get 
; 
set 
; 
}  
public 

int 
Number 
{ 
get 
; 
set  
;  !
}" #
public 

int 
x 
{ 
get 
; 
set 
; 
} 
public 

int 
y 
{ 
get 
; 
set 
; 
} 
public		 

bool		 

IsOccupied		 
{		 
get		  
;		  !
set		" %
;		% &
}		' (
}

 ƒz
>Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Program.cs
var 
builder 
= 
WebApplication 
. 
CreateBuilder *
(* +
args+ /
)/ 0
;0 1
builder!! 
.!! 
WebHost!! 
.!! 
UseUrls!! 
(!! 
$str!! -
)!!- .
;!!. /
builder$$ 
.$$ 
Services$$ 
.$$ 
	AddScoped$$ 
<$$ 
IGenericService$$ *
<$$* +
Order$$+ 0
>$$0 1
,$$1 2
GenericService$$3 A
<$$A B
Order$$B G
>$$G H
>$$H I
($$I J
)$$J K
;$$K L
builder%% 
.%% 
Services%% 
.%% 
	AddScoped%% 
<%% 
IOrderService%% (
,%%( )
OrderService%%* 6
>%%6 7
(%%7 8
)%%8 9
;%%9 :
builder&& 
.&& 
Services&& 
.&& 
	AddScoped&& 
<&& 
IGenericService&& *
<&&* +
OrderDetail&&+ 6
>&&6 7
,&&7 8
GenericService&&9 G
<&&G H
OrderDetail&&H S
>&&S T
>&&T U
(&&U V
)&&V W
;&&W X
builder'' 
.'' 
Services'' 
.'' 
	AddScoped'' 
<'' 
IOrderDetailService'' .
,''. /
OrderDetailService''0 B
>''B C
(''C D
)''D E
;''E F
builder(( 
.(( 
Services(( 
.(( 
	AddScoped(( 
<(( 
IGenericService(( *
<((* +
Product((+ 2
>((2 3
,((3 4
GenericService((5 C
<((C D
Product((D K
>((K L
>((L M
(((M N
)((N O
;((O P
builder)) 
.)) 
Services)) 
.)) 
	AddScoped)) 
<)) 
IProductService)) *
,))* +
ProductService)), :
>)): ;
()); <
)))< =
;))= >
builder** 
.** 
Services** 
.** 
	AddScoped** 
<** 
IGenericService** *
<*** +
Table**+ 0
>**0 1
,**1 2
GenericService**3 A
<**A B
Table**B G
>**G H
>**H I
(**I J
)**J K
;**K L
builder++ 
.++ 
Services++ 
.++ 
	AddScoped++ 
<++ 
ITableService++ (
,++( )
TableService++* 6
>++6 7
(++7 8
)++8 9
;++9 :
builder,, 
.,, 
Services,, 
.,, 
	AddScoped,, 
<,, 
IGenericService,, *
<,,* +
TableSession,,+ 7
>,,7 8
,,,8 9
GenericService,,: H
<,,H I
TableSession,,I U
>,,U V
>,,V W
(,,W X
),,X Y
;,,Y Z
builder-- 
.-- 
Services-- 
.-- 
	AddScoped-- 
<--  
ITableSessionService-- /
,--/ 0
TableSessionService--1 D
>--D E
(--E F
)--F G
;--G H
builder.. 
... 
Services.. 
... 
	AddScoped.. 
<.. 
IGenericService.. *
<..* +
User..+ /
>../ 0
,..0 1
GenericService..2 @
<..@ A
User..A E
>..E F
>..F G
(..G H
)..H I
;..I J
builder// 
.// 
Services// 
.// 
	AddScoped// 
<// 
Restaurant_Backend// -
.//- .
Services//. 6
.//6 7
Authentication//7 E
.//E F"
IAuthenticationService//F \
,//\ ]
Restaurant_Backend//^ p
.//p q
Services//q y
.//y z
Authentication	//z à
.
//à â
Implementation
//â ó
.
//ó ò#
AuthenticationService
//ò ≠
>
//≠ Æ
(
//Æ Ø
)
//Ø ∞
;
//∞ ±
builder00 
.00 
Services00 
.00 
	AddScoped00 
<00 
IUserService00 '
,00' (
UserService00) 4
>004 5
(005 6
)006 7
;007 8
builder55 
.55 
Services55 
.55 
AddDbContext55 
<55 
AppDbContext55 *
>55* +
(55+ ,
options55, 3
=>554 6
options66 
.66 
	UseNpgsql66 
(66 
builder66 
.66 
Configuration66 +
.66+ ,
GetConnectionString66, ?
(66? @
$str66@ S
)66S T
)66T U
)66U V
;66V W
builder99 
.99 
Services99 
.99 
AddSingleton99 
<99 

AutoMapper99 (
.99( )"
IConfigurationProvider99) ?
>99? @
(99@ A
sp99A C
=>99D F
{:: 
var;; 
config;; 
=;; 
new;; 
MapperConfiguration;; (
(;;( )
cfg;;) ,
=>;;- /
{<< 
cfg== 
.== 

AddProfile== 
(== 
new== 
AutoMapperProfile== ,
(==, -
sp==- /
)==/ 0
)==0 1
;==1 2
}>> 
)>> 
;>> 
return?? 

config?? 
;?? 
}@@ 
)@@ 
;@@ 
builderBB 
.BB 
ServicesBB 
.BB 
	AddScopedBB 
<BB 
IMapperBB "
>BB" #
(BB# $
spBB$ &
=>BB' )
newCC 
MapperCC 
(CC 
spCC 
.CC 
GetRequiredServiceCC $
<CC$ %

AutoMapperCC% /
.CC/ 0"
IConfigurationProviderCC0 F
>CCF G
(CCG H
)CCH I
,CCI J
spCCK M
.CCM N

GetServiceCCN X
)CCX Y
)CCY Z
;CCZ [
builderFF 
.FF 
ServicesFF 
.FF 
AddControllersFF 
(FF  
)FF  !
;FF! "
builderHH 
.HH 
ServicesHH 
.HH "
AddHttpContextAccessorHH '
(HH' (
)HH( )
;HH) *
builderKK 
.KK 
ServicesKK 
.KK #
AddEndpointsApiExplorerKK (
(KK( )
)KK) *
;KK* +
builderLL 
.LL 
ServicesLL 
.LL 
AddSwaggerGenLL 
(LL 
cLL  
=>LL! #
{MM 
varNN 
xmlFileNN 
=NN 
$"NN 
{NN 
AssemblyNN 
.NN  
GetExecutingAssemblyNN 2
(NN2 3
)NN3 4
.NN4 5
GetNameNN5 <
(NN< =
)NN= >
.NN> ?
NameNN? C
}NNC D
$strNND H
"NNH I
;NNI J
varOO 
xmlPathOO 
=OO 
PathOO 
.OO 
CombineOO 
(OO 

AppContextOO )
.OO) *
BaseDirectoryOO* 7
,OO7 8
xmlFileOO9 @
)OO@ A
;OOA B
cPP 
.PP 
IncludeXmlCommentsPP 
(PP 
xmlPathPP  
)PP  !
;PP! "
}QQ 
)QQ 
;QQ 
builderTT 
.TT 
ServicesTT 
.TT 
AddCorsTT 
(TT 
)TT 
;TT 
varVV 
jwtSettingsSectionVV 
=VV 
builderVV  
.VV  !
ConfigurationVV! .
.VV. /

GetSectionVV/ 9
(VV9 :
$strVV: G
)VVG H
;VVH I
builderWW 
.WW 
ServicesWW 
.WW 
	ConfigureWW 
<WW 
JwtSettingsWW &
>WW& '
(WW' (
jwtSettingsSectionWW( :
)WW: ;
;WW; <
varYY 
jwtSettingsYY 
=YY 
jwtSettingsSectionYY $
.YY$ %
GetYY% (
<YY( )
JwtSettingsYY) 4
>YY4 5
(YY5 6
)YY6 7
;YY7 8
builder]] 
.]] 
Services]] 
.]] 
AddAuthentication]] "
(]]" #
JwtBearerDefaults]]# 4
.]]4 5 
AuthenticationScheme]]5 I
)]]I J
.^^ 
AddJwtBearer^^ 
(^^ 
options^^ 
=>^^ 
{__ 
options`` 
.`` %
TokenValidationParameters`` %
=``& '
new``( +%
TokenValidationParameters``, E
{aa 
ValidateIssuerbb 
=bb 
truebb 
,bb 
ValidateLifetimecc 
=cc 
truecc 
,cc  $
ValidateIssuerSigningKeydd  
=dd! "
truedd# '
,dd' (
ValidIssueree 
=ee 
jwtSettingsee !
.ee! "
Issueree" (
,ee( )
ValidateAudienceff 
=ff 
falseff  
,ff  !
IssuerSigningKeygg 
=gg 
newgg  
SymmetricSecurityKeygg 3
(gg3 4
Encodinggg4 <
.gg< =
UTF8gg= A
.ggA B
GetBytesggB J
(ggJ K
jwtSettingsggK V
.ggV W
	SecretKeyggW `
)gg` a
)gga b
,ggb c
RoleClaimTypehh 
=hh 

ClaimTypeshh "
.hh" #
Rolehh# '
}ii 
;ii 
}jj 
)jj 
;jj 
builderll 
.ll 
Servicesll 
.ll 
AddAuthorizationll !
(ll! "
)ll" #
;ll# $
builderoo 
.oo 
Servicesoo 
.oo 
AddSwaggerGenoo 
(oo 
coo  
=>oo! #
{pp 
cqq 
.qq 

SwaggerDocqq 
(qq 
$strqq 
,qq 
newqq 
OpenApiInfoqq &
{rr 
Titless 
=ss 
builderss 
.ss 
Configurationss %
[ss% &
$strss& 5
]ss5 6
,ss6 7
Versiontt 
=tt 
buildertt 
.tt 
Configurationtt '
[tt' (
$strtt( 9
]tt9 :
,tt: ;
}uu 
)uu 
;uu 
cww 
.ww %
ResolveConflictingActionsww 
(ww  
apiDescriptionsww  /
=>ww0 2
apiDescriptionsww3 B
.wwB C
FirstwwC H
(wwH I
)wwI J
)wwJ K
;wwK L
cyy 
.yy !
AddSecurityDefinitionyy 
(yy 
$stryy $
,yy$ %
newyy& )!
OpenApiSecuritySchemeyy* ?
{zz 
Description{{ 
={{ 
$str	{{ ç
,
{{ç é
Name|| 
=|| 
$str|| 
,|| 
In}} 

=}} 
ParameterLocation}} 
.}} 
Header}} %
,}}% &
Type~~ 
=~~ 
SecuritySchemeType~~ !
.~~! "
ApiKey~~" (
,~~( )
Scheme 
= 
$str 
}
ÄÄ 
)
ÄÄ 
;
ÄÄ 
c
ÇÇ 
.
ÇÇ $
AddSecurityRequirement
ÇÇ 
(
ÇÇ 
new
ÇÇ  (
OpenApiSecurityRequirement
ÇÇ! ;
{
ÉÉ 
{
ÑÑ 
new
ÖÖ #
OpenApiSecurityScheme
ÖÖ -
{
ÜÜ 
	Reference
áá !
=
áá" #
new
áá$ '
OpenApiReference
áá( 8
{
àà 
Type
ââ  
=
ââ! "
ReferenceType
ââ# 0
.
ââ0 1
SecurityScheme
ââ1 ?
,
ââ? @
Id
ää 
=
ää  
$str
ää! )
}
ãã 
,
ãã 
Scheme
åå 
=
åå  
$str
åå! )
,
åå) *
Name
çç 
=
çç 
$str
çç '
,
çç' (
In
éé 
=
éé 
ParameterLocation
éé .
.
éé. /
Header
éé/ 5
}
èè 
,
èè 
new
êê 
List
êê 
<
êê 
string
êê #
>
êê# $
(
êê$ %
)
êê% &
}
ëë 
}
íí 
)
íí 
;
íí 
}ìì 
)
ìì 
;
ìì 
varïï 
app
ïï 
=
ïï 	
builder
ïï
 
.
ïï 
Build
ïï 
(
ïï 
)
ïï 
;
ïï 
usingòò 
(
òò 
var
òò 

scope
òò 
=
òò 
app
òò 
.
òò 
Services
òò 
.
òò  
CreateScope
òò  +
(
òò+ ,
)
òò, -
)
òò- .
{ôô 
var
öö 
context
öö 
=
öö 
scope
öö 
.
öö 
ServiceProvider
öö '
.
öö' ( 
GetRequiredService
öö( :
<
öö: ;
AppDbContext
öö; G
>
ööG H
(
ööH I
)
ööI J
;
ööJ K
try
õõ 
{
úú 
context
ùù 
.
ùù 
Database
ùù 
.
ùù 
Migrate
ùù  
(
ùù  !
)
ùù! "
;
ùù" #
Console
ûû 
.
ûû 
	WriteLine
ûû 
(
ûû 
$str
ûû :
)
ûû: ;
;
ûû; <
}
üü 
catch
†† 	
(
††
 
	Exception
†† 
ex
†† 
)
†† 
{
°° 
Console
¢¢ 
.
¢¢ 
	WriteLine
¢¢ 
(
¢¢ 
$"
¢¢ 
$str
¢¢ 6
{
¢¢6 7
ex
¢¢7 9
.
¢¢9 :
Message
¢¢: A
}
¢¢A B
"
¢¢B C
)
¢¢C D
;
¢¢D E
}
££ 
}§§ 
ifßß 
(
ßß 
app
ßß 
.
ßß 
Environment
ßß 
.
ßß 
IsDevelopment
ßß !
(
ßß! "
)
ßß" #
)
ßß# $
{®® 
app
©© 
.
©© 

UseSwagger
©© 
(
©© 
)
©© 
;
©© 
app
™™ 
.
™™ 
UseSwaggerUI
™™ 
(
™™ 
)
™™ 
;
™™ 
}´´ 
appÆÆ 
.
ÆÆ 
UseCors
ÆÆ 
(
ÆÆ 
policy
ÆÆ 
=>
ÆÆ 
{ØØ 
policy
∞∞ 

.
∞∞
 
WithOrigins
∞∞ 
(
∞∞ 
$str
∞∞ .
)
∞∞. /
.
±± 	
AllowAnyHeader
±±	 
(
±± 
)
±± 
.
≤≤ 	
AllowAnyMethod
≤≤	 
(
≤≤ 
)
≤≤ 
.
≥≥ 	
AllowCredentials
≥≥	 
(
≥≥ 
)
≥≥ 
;
≥≥ 
}¥¥ 
)
¥¥ 
;
¥¥ 
app∏∏ 
.
∏∏ 
UseAuthentication
∏∏ 
(
∏∏ 
)
∏∏ 
;
∏∏ 
appππ 
.
ππ 
UseAuthorization
ππ 
(
ππ 
)
ππ 
;
ππ 
app∫∫ 
.
∫∫ 
MapControllers
∫∫ 
(
∫∫ 
)
∫∫ 
;
∫∫ 
appºº 
.
ºº 
Run
ºº 
(
ºº 
)
ºº 	
;
ºº	 

eY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Authentication\IAuthenticationService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Authentication& 4
;4 5
public

 
	interface

 "
IAuthenticationService

 '
{ "
AuthenticationResponse 
GenerateJwt &
(& '
User' +
user, 0
)0 1
;1 2
} 
sY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Authentication\Implementation\AuthenticationService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Authentication& 4
.4 5
Implementation5 C
;C D
public 
class !
AuthenticationService "
:# $"
IAuthenticationService% ;
{ 
public		 
!
AuthenticationService		  
(		  !
)		! "
{

 
} 
public 
"
AuthenticationResponse !
GenerateJwt" -
(- .
User. 2
user3 7
)7 8
{ 
string 
token 
= 
Encrypt 
. 
GenerateToken ,
(, -
user- 1
)1 2
;2 3
return 
new "
AuthenticationResponse )
() *
user* .
.. /
UserName/ 7
,7 8
token9 >
)> ?
;? @
} 
}  
[Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\DataAccessLayer\IGenericDao.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
DataAccessLayer& 5
;5 6
public 
	interface 
IGenericDao 
< 
TEntity $
>$ %
where& +
TEntity, 3
:4 5

EntityBase6 @
{ 
Task 
InsertAsync	 
( 
TEntity 
entity #
)# $
;$ %
Task 
InsertAsync	 
( 
IEnumerable  
<  !
TEntity! (
>( )
entities* 2
)2 3
;3 4
Task 
DeleteAsync	 
( 
TEntity 
entity #
)# $
;$ %
Task 
UpdateAsync	 
( 
TEntity 
entity #
)# $
;$ %
Task%% 
<%% 	
TEntity%%	 
>%% 
GetAsync%% 
(%% 
params%% !
object%%" (
[%%( )
]%%) *
	keyValues%%+ 4
)%%4 5
;%%5 6
Task++ 
<++ 	
IEnumerable++	 
<++ 
TEntity++ 
>++ 
>++ 
FindAllAsync++ +
(+++ ,
)++, -
;++- .

IQueryable22 
<22 
TEntity22 
>22 
Where22 
(22 

Expression22 (
<22( )
Func22) -
<22- .
TEntity22. 5
,225 6
bool227 ;
>22; <
>22< =

expression22> H
)22H I
;22I J
Task77 
	SaveAsync77	 
(77 
)77 
;77 
}88 ‚
_Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\DataAccessLayer\IGenericService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
DataAccessLayer& 5
;5 6
public

 
	interface

 
IGenericService

  
<

  !
TEntity

! (
>

( )
where

* /
TEntity

0 7
:

8 9

EntityBase

: D
{ 
Task 
< 	
TEntity	 
? 
> 
GetByIdAsync 
(  
Guid  $
entityId% -
)- .
;. /
Task 
< 	
TEntity	 
> 
GetAsync 
( 
TEntity "
entity# )
)) *
;* +
Task 
InsertAsync	 
( 
TEntity 
entity #
)# $
;$ %
Task"" 
DeleteAsync""	 
("" 
TEntity"" 
entity"" #
)""# $
;""$ %
Task(( 
UpdateAsync((	 
((( 
TEntity(( 
entity(( #
)((# $
;(($ %
Task.. 
<.. 	
IEnumerable..	 
<.. 
TEntity.. 
>.. 
>.. 
FindAllAsync.. +
(..+ ,
).., -
;..- .

IQueryable55 
<55 
TEntity55 
>55 "
FilterByExpressionLinq55 .
(55. /

Expression55/ 9
<559 :
Func55: >
<55> ?
TEntity55? F
,55F G
bool55H L
>55L M
>55M N

expression55O Y
)55Y Z
;55Z [
}66 ‰C
iY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\DataAccessLayer\Implementation\GenericDao.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
DataAccessLayer& 5
.5 6
Implementation6 D
;D E
public 
class 

GenericDao 
< 
TEntity 
>  
:! "
IGenericDao# .
<. /
TEntity/ 6
>6 7
where8 =
TEntity> E
:F G

EntityBaseH R
{		 
public

 


GenericDao

 
(

 
AppDbContext

 "
context

# *
)

* +
{ 

GetContext 
= 
context 
; 
DbSet 
= 

GetContext 
. 
Set 
< 
TEntity &
>& '
(' (
)( )
;) *
} 
public 

DbSet 
< 
TEntity 
> 
DbSet 
{  !
get" %
;% &
}' (
public 

AppDbContext 

GetContext "
{# $
get% (
;( )
}* +
public 

async 
Task 
InsertAsync !
(! "
TEntity" )
entity* 0
)0 1
{ 
try 
{ 	
await 
DbSet 
. 
AddAsync  
(  !
entity! '
)' (
;( )
} 	
catch 
( 
	Exception 
ex 
) 
{ 	
System 
. 
Diagnostics 
. 
Debug $
.$ %
	WriteLine% .
(. /
$str/ ?
,? @
exA C
)C D
;D E
throw 
new %
InvalidOperationException /
(/ 0
$str0 _
,_ `
exa c
)c d
;d e
} 	
} 
public!! 

async!! 
Task!! 
InsertAsync!! !
(!!! "
IEnumerable!!" -
<!!- .
TEntity!!. 5
>!!5 6
entities!!7 ?
)!!? @
{"" 
try## 
{$$ 	
await%% 
DbSet%% 
.%% 
AddRangeAsync%% %
(%%% &
entities%%& .
)%%. /
;%%/ 0
}&& 	
catch'' 
('' 
	Exception'' 
ex'' 
)'' 
{(( 	
System)) 
.)) 
Diagnostics)) 
.)) 
Debug)) $
.))$ %
	WriteLine))% .
()). /
$str))/ ?
,))? @
ex))A C
)))C D
;))D E
throw** 
new** %
InvalidOperationException** /
(**/ 0
$str**0 l
,**l m
ex**n p
)**p q
;**q r
}++ 	
},, 
public.. 

Task.. 
DeleteAsync.. 
(.. 
TEntity.. #
entity..$ *
)..* +
{// 
try00 
{11 	
DbSet22 
.22 
Remove22 
(22 
entity22 
)22  
;22  !
return33 
Task33 
.33 
CompletedTask33 %
;33% &
}44 	
catch55 
(55 
	Exception55 
ex55 
)55 
{66 	
System77 
.77 
Diagnostics77 
.77 
Debug77 $
.77$ %
	WriteLine77% .
(77. /
$str77/ ?
,77? @
ex77A C
)77C D
;77D E
throw88 
new88 %
InvalidOperationException88 /
(88/ 0
$str880 ^
,88^ _
ex88` b
)88b c
;88c d
}99 	
}:: 
public<< 

Task<< 
UpdateAsync<< 
(<< 
TEntity<< #
entity<<$ *
)<<* +
{== 
try>> 
{?? 	

GetContext@@ 
.@@ 
Entry@@ 
(@@ 
entity@@ #
)@@# $
.@@$ %
State@@% *
=@@+ ,
EntityState@@- 8
.@@8 9
Modified@@9 A
;@@A B
returnAA 
TaskAA 
.AA 
CompletedTaskAA %
;AA% &
}BB 	
catchCC 
(CC 
	ExceptionCC 
exCC 
)CC 
{DD 	
SystemEE 
.EE 
DiagnosticsEE 
.EE 
DebugEE $
.EE$ %
	WriteLineEE% .
(EE. /
$strEE/ ?
,EE? @
exEEA C
)EEC D
;EED E
throwFF 
newFF %
InvalidOperationExceptionFF /
(FF/ 0
$strFF0 ^
,FF^ _
exFF` b
)FFb c
;FFc d
}GG 	
}HH 
publicJJ 

asyncJJ 
TaskJJ 
<JJ 
TEntityJJ 
>JJ 
GetAsyncJJ '
(JJ' (
paramsJJ( .
objectJJ/ 5
[JJ5 6
]JJ6 7
	keyValuesJJ8 A
)JJA B
{KK 
tryLL 
{MM 	
TEntityNN 
?NN 
entityNN 
=NN 
awaitNN #
DbSetNN$ )
.NN) *
	FindAsyncNN* 3
(NN3 4
	keyValuesNN4 =
)NN= >
;NN> ?
returnOO 
entityOO 
??OO 
throwOO "
newOO# &%
InvalidOperationExceptionOO' @
(OO@ A
$strOOA T
)OOT U
;OOU V
}PP 	
catchQQ 
(QQ 
	ExceptionQQ 
exQQ 
)QQ 
{RR 	
SystemSS 
.SS 
DiagnosticsSS 
.SS 
DebugSS $
.SS$ %
	WriteLineSS% .
(SS. /
$strSS/ ?
,SS? @
exSSA C
)SSC D
;SSD E
throwTT 
newTT %
InvalidOperationExceptionTT /
(TT/ 0
$strTT0 `
,TT` a
exTTb d
)TTd e
;TTe f
}UU 	
}VV 
publicXX 

asyncXX 
TaskXX 
<XX 
IEnumerableXX !
<XX! "
TEntityXX" )
>XX) *
>XX* +
FindAllAsyncXX, 8
(XX8 9
)XX9 :
{YY 
tryZZ 
{[[ 	
return\\ 
await\\ 
DbSet\\ 
.\\ 
ToListAsync\\ *
(\\* +
)\\+ ,
;\\, -
}]] 	
catch^^ 
(^^ 
	Exception^^ 
ex^^ 
)^^ 
{__ 	
System`` 
.`` 
Diagnostics`` 
.`` 
Debug`` $
.``$ %
	WriteLine``% .
(``. /
$str``/ ?
,``? @
ex``A C
)``C D
;``D E
throwaa 
newaa %
InvalidOperationExceptionaa /
(aa/ 0
$straa0 b
,aab c
exaad f
)aaf g
;aag h
}bb 	
}cc 
publicee 

asyncee 
Taskee 
	SaveAsyncee 
(ee  
)ee  !
{ff 
trygg 
{hh 	
awaitii 

GetContextii 
.ii 
SaveChangesAsyncii -
(ii- .
)ii. /
;ii/ 0
}jj 	
catchkk 
(kk 
	Exceptionkk 
exkk 
)kk 
{ll 	
Systemmm 
.mm 
Diagnosticsmm 
.mm 
Debugmm $
.mm$ %
	WriteLinemm% .
(mm. /
$strmm/ ?
,mm? @
exmmA C
)mmC D
;mmD E
thrownn 
newnn %
InvalidOperationExceptionnn /
(nn/ 0
$strnn0 i
,nni j
exnnk m
)nnm n
;nnn o
}oo 	
}pp 
publicrr 


IQueryablerr 
<rr 
TEntityrr 
>rr 
Whererr $
(rr$ %

Expressionrr% /
<rr/ 0
Funcrr0 4
<rr4 5
TEntityrr5 <
,rr< =
boolrr> B
>rrB C
>rrC D

expressionrrE O
)rrO P
{ss 
returntt 
DbSettt 
.tt 
Wherett 
(tt 

expressiontt %
)tt% &
;tt& '
}uu 
}vv ¢"
mY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\DataAccessLayer\Implementation\GenericService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
DataAccessLayer& 5
.5 6
Implementation6 D
;D E
public 
class 
GenericService 
< 
TEntity #
># $
:% &
IGenericService' 6
<6 7
TEntity7 >
>> ?
where@ E
TEntityF M
:N O

EntityBaseP Z
{		 
	protected

 
IGenericDao

 
<

 
TEntity

 !
>

! "

GenericDao

# -
;

- .
public 

GenericService 
( 
AppDbContext &
context' .
). /
{ 

GenericDao 
= 
new 

GenericDao #
<# $
TEntity$ +
>+ ,
(, -
context- 4
)4 5
;5 6
} 
public 

async 
Task 
< 
TEntity 
? 
> 
GetByIdAsync  ,
(, -
Guid- 1
entityId2 :
): ;
{ 
return 
await 

GenericDao 
. 
Where 
( 
entity %
=>& (
entity) /
./ 0
Id0 2
==3 5
entityId6 >
)> ?
. 
FirstOrDefaultAsync ,
(, -
)- .
;. /
} 
public 

async 
Task 
< 
TEntity 
> 
GetAsync '
(' (
TEntity( /
entity0 6
)6 7
{ 
return 
await 

GenericDao 
.  
GetAsync  (
(( )
entity) /
)/ 0
;0 1
} 
public 

async 
Task 
InsertAsync !
(! "
TEntity" )
entity* 0
)0 1
{ 
await 

GenericDao 
. 
InsertAsync $
($ %
entity% +
)+ ,
;, -
await 

GenericDao 
. 
	SaveAsync "
(" #
)# $
;$ %
}   
public"" 

async"" 
Task"" 
DeleteAsync"" !
(""! "
TEntity""" )
entity""* 0
)""0 1
{## 
await$$ 

GenericDao$$ 
.$$ 
DeleteAsync$$ $
($$$ %
entity$$% +
)$$+ ,
;$$, -
await%% 

GenericDao%% 
.%% 
	SaveAsync%% "
(%%" #
)%%# $
;%%$ %
}&& 
public(( 

async(( 
Task(( 
UpdateAsync(( !
(((! "
TEntity((" )
entity((* 0
)((0 1
{)) 
await** 

GenericDao** 
.** 
UpdateAsync** $
(**$ %
entity**% +
)**+ ,
;**, -
await++ 

GenericDao++ 
.++ 
	SaveAsync++ "
(++" #
)++# $
;++$ %
},, 
public.. 

async.. 
Task.. 
<.. 
IEnumerable.. !
<..! "
TEntity.." )
>..) *
>..* +
FindAllAsync.., 8
(..8 9
)..9 :
{// 
return00 
await00 

GenericDao00 
.00  
FindAllAsync00  ,
(00, -
)00- .
;00. /
}11 
public33 


IQueryable33 
<33 
TEntity33 
>33 "
FilterByExpressionLinq33 5
(335 6

Expression336 @
<33@ A
Func33A E
<33E F
TEntity33F M
,33M N
bool33O S
>33S T
>33T U

expression33V `
)33` a
{44 
return55 

GenericDao55 
.55 
Where55 
(55  

expression55  *
)55* +
;55+ ,
}66 
}77 ≈&
mY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\OrderDetail\Implementation\OrderDetailService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
OrderDetail& 1
.1 2
Implementation2 @
;@ A
public 
class 
OrderDetailService 
:  !
IOrderDetailService" 5
{ 
private		 
readonly		 
IGenericService		 $
<		$ %
OrderDetail		% 0
>		0 1%
orderDetailGenericService		2 K
;		K L
public

 

OrderDetailService

 
(

 
IGenericService

 -
<

- .
OrderDetail

. 9
>

9 : 
orederGenericService

; O
)

O P
{ %
orderDetailGenericService !
=" # 
orederGenericService$ 8
;8 9
} 
public 

async 
Task 
< 
OrderDetail !
>! ""
CreateOrderDetailAsync# 9
(9 :
OrderDetail: E
orderDetailF Q
)Q R
{ 
await %
orderDetailGenericService '
.' (
InsertAsync( 3
(3 4
orderDetail4 ?
)? @
;@ A
return 
orderDetail 
; 
} 
public 

async 
Task 
< 
OrderDetail !
?! "
>" ##
GetOrderDetailByIdAsync$ ;
(; <
Guid< @
orderDetailIdA N
)N O
{ 
return 
await %
orderDetailGenericService .
.. /
GetByIdAsync/ ;
(; <
orderDetailId< I
)I J
;J K
} 
public 

async 
Task 
< 
IEnumerable !
<! "
OrderDetail" -
>- .
>. /-
!GetAllOrdersDetailsFromOrderAsync0 Q
(Q R
GuidR V
orderIdW ^
)^ _
{ 
return 
await %
orderDetailGenericService .
. "
FilterByExpressionLinq +
(+ ,
orderDetail, 7
=>8 :
orderDetail; F
.F G
OrderIdG N
==O Q
orderIdR Y
)Y Z
. 
ToListAsync  
(  !
)! "
;" #
} 
public   

async   
Task   
<   
IEnumerable   !
<  ! "
OrderDetail  " -
>  - .
>  . //
#GetAllOrdersDetailsFromProductAsync  0 S
(  S T
Guid  T X
	productId  Y b
)  b c
{!! 
return"" 
await"" %
orderDetailGenericService"" .
.## "
FilterByExpressionLinq## +
(##+ ,
orderDetail##, 7
=>##8 :
orderDetail##; F
.##F G
	ProductId##G P
==##Q S
	productId##T ]
)##] ^
.$$ 
ToListAsync$$  
($$  !
)$$! "
;$$" #
}%% 
public'' 

async'' 
Task'' "
UpdateOrderDetailAsync'' ,
('', -
OrderDetail''- 8
updatedDetail''9 F
)''F G
{(( 
await)) %
orderDetailGenericService)) '
.))' (
UpdateAsync))( 3
())3 4
updatedDetail))4 A
)))A B
;))B C
}** 
public,, 

async,, 
Task,, "
DeleteOrderDetailAsync,, ,
(,,, -
Guid,,- 1
orderDetailId,,2 ?
),,? @
{-- 
OrderDetail.. 
?.. 
orderDetail..  
=..! "
await..# (%
orderDetailGenericService..) B
...B C
GetByIdAsync..C O
(..O P
orderDetailId..P ]
)..] ^
??.._ a
throw..b g
new..h k&
InvalidOperationException	..l Ö
(
..Ö Ü
$str
..Ü ò
)
..ò ô
;
..ô ö
try00 
{11 	
await22 %
orderDetailGenericService22 +
.22+ ,
DeleteAsync22, 7
(227 8
orderDetail228 C
)22C D
;22D E
}33 	
catch44 
(44 
	Exception44 
ex44 
)44 
{55 	
throw66 
new66 %
InvalidOperationException66 /
(66/ 0
$"660 2
$str662 G
{66G H
orderDetailId66H U
}66U V
$str66V X
{66X Y
ex66Y [
.66[ \
Message66\ c
}66c d
"66d e
)66e f
;66f g
}77 	
}88 
}99 ™
_Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\OrderDetail\IOrderDetailService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
OrderDetail& 1
;1 2
public 
	interface 
IOrderDetailService $
{ 
Task 
< 	
OrderDetail	 
> "
CreateOrderDetailAsync ,
(, -
OrderDetail- 8
orderDetail9 D
)D E
;E F
Task 
< 	
OrderDetail	 
? 
> #
GetOrderDetailByIdAsync .
(. /
Guid/ 3
orderDetailId4 A
)A B
;B C
Task

 
<

 	
IEnumerable

	 
<

 
OrderDetail

  
>

  !
>

! "-
!GetAllOrdersDetailsFromOrderAsync

# D
(

D E
Guid

E I
orderId

J Q
)

Q R
;

R S
Task 
< 	
IEnumerable	 
< 
OrderDetail  
>  !
>! "/
#GetAllOrdersDetailsFromProductAsync# F
(F G
GuidG K
	productIdL U
)U V
;V W
Task "
UpdateOrderDetailAsync	 
(  
OrderDetail  +
updatedDetail, 9
)9 :
;: ;
Task "
DeleteOrderDetailAsync	 
(  
Guid  $
orderDetailId% 2
)2 3
;3 4
} ÿK
aY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Order\Implementation\OrderService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Order& +
.+ ,
Implementation, :
;: ;
public		 
class		 
OrderService		 
:		 
IOrderService		 )
{

 
private 
readonly 
IGenericService $
<$ %
Order% *
>* + 
_orderGenericService, @
;@ A
public 

OrderService 
( 
IGenericService '
<' (
Order( -
>- . 
orederGenericService/ C
)C D
{  
_orderGenericService 
=  
orederGenericService 3
;3 4
} 
public 

async 
Task 
< 
IEnumerable !
<! "
Order" '
>' (
>( )
GetAllOrdersAsync* ;
(; <
)< =
{ 
var 
orders 
= 
await  
_orderGenericService /
. "
FilterByExpressionLinq #
(# $
order$ )
=>* ,
true- 1
)1 2
. 
Include 
( 
order 
=> 
order #
.# $
Table$ )
)) *
. 
Include 
( 
order 
=> 
order #
.# $
ProductList$ /
)/ 0
. 
ThenInclude 
( 
item 
=>  
item! %
.% &
Product& -
)- .
. 
ToListAsync 
( 
) 
; 
return 
orders 
; 
} 
public 

async 
Task 
< 
Order 
> 
CreateOrderAsync -
(- .
Order. 3
order4 9
)9 :
{ 
order 
. 
TotalAmount 
= 
order !
.! "
TotalAmountSum" 0
;0 1
await    
_orderGenericService   "
.  " #
InsertAsync  # .
(  . /
order  / 4
)  4 5
;  5 6
return!! 
order!! 
;!! 
}"" 
public$$ 

async$$ 
Task$$ 
<$$ 
Order$$ 
>$$ 
UpdateOrderAsync$$ -
($$- .
Order$$. 3
order$$4 9
)$$9 :
{%% 
await&&  
_orderGenericService&& "
.&&" #
UpdateAsync&&# .
(&&. /
order&&/ 4
)&&4 5
;&&5 6
return'' 
order'' 
;'' 
}(( 
public** 

async** 
Task** 
<** 
Order** 
?** 
>** 
GetOrderByIdAsync** /
(**/ 0
Guid**0 4
orderId**5 <
)**< =
{++ 
var,, 
order,, 
=,, 
await,,  
_orderGenericService,, .
.--	 
"
FilterByExpressionLinq--
  
(--  !
order--! &
=>--' )
order--* /
.--/ 0
Id--0 2
==--3 5
orderId--6 =
)--= >
...	 

Include..
 
(.. 
order.. 
=>.. 
order..  
...  !
Table..! &
)..& '
.//	 

Include//
 
(// 
order// 
=>// 
order//  
.//  !
ProductList//! ,
)//, -
.00	 

ThenInclude00
 
(00 
item00 
=>00 
item00 "
.00" #
Product00# *
)00* +
.11	 

FirstOrDefaultAsync11
 
(11 
)11 
??22	 
throw22 
new22 "
OrderNotFoundException22 ,
(22, -
orderId22- 4
)224 5
;225 6
return44 
order44 
;44 
}55 
public77 

async77 
Task77 
<77 
IEnumerable77 !
<77! "
Order77" '
>77' (
>77( )
GetTableOrdersAsync77* =
(77= >
Guid77> B
tableId77C J
)77J K
{88 
return99 
await99  
_orderGenericService99 )
.:: "
FilterByExpressionLinq:: #
(::# $
order::$ )
=>::* ,
order::- 2
.::2 3
TableId::3 :
==::; =
tableId::> E
)::F G
.;; 
Include;; 
(;; 
order;; 
=>;; 
order;; #
.;;# $
Table;;$ )
);;) *
.<< 
Include<< 
(<< 
order<< 
=><< 
order<< #
.<<# $
ProductList<<$ /
)<</ 0
.== 
ThenInclude== 
(== 
item== 
=>==  
item==! %
.==% &
Product==& -
)==- .
.>> 
ToListAsync>> 
(>> 
)>> 
;>> 
}?? 
publicAA 

asyncAA 
TaskAA 
<AA 
IEnumerableAA !
<AA! "
OrderAA" '
>AA' (
>AA( )!
GetSessionOrdersAsyncAA* ?
(AA? @
GuidAA@ D
tableSessionIdAAE S
)AAS T
{BB 
returnCC 
awaitCC  
_orderGenericServiceCC )
.DD "
FilterByExpressionLinqDD #
(DD# $
orderDD$ )
=>DD* ,
orderDD- 2
.DD2 3
TableSessionIdDD3 A
==DDB D
tableSessionIdDDE S
)DDS T
.EE 
IncludeEE 
(EE 
orderEE 
=>EE 
orderEE #
.EE# $
TableEE$ )
)EE) *
.FF 
IncludeFF 
(FF 
orderFF 
=>FF 
orderFF #
.FF# $
ProductListFF$ /
)FF/ 0
.GG 
ThenIncludeGG 
(GG 
itemGG 
=>GG  
itemGG! %
.GG% &
ProductGG& -
)GG- .
.HH 
ToListAsyncHH 
(HH 
)HH 
;HH 
}II 
publicKK 

asyncKK 
TaskKK "
UpdateOrderStatusAsyncKK ,
(KK, -
GuidKK- 1
orderIdKK2 9
,KK9 :
OrderStatusKK; F
	newStatusKKG P
)KKP Q
{LL 
OrderMM 
?MM 
orderMM 
=MM 
awaitMM  
_orderGenericServiceMM 1
.MM1 2
GetByIdAsyncMM2 >
(MM> ?
orderIdMM? F
)MMF G
??MMH J
throwMMK P
newMMQ T"
OrderNotFoundExceptionMMU k
(MMk l
orderIdMMl s
)MMs t
;MMt u
orderNN 
.NN 
StatusNN 
=NN 
	newStatusNN  
;NN  !
awaitPP  
_orderGenericServicePP "
.PP" #
UpdateAsyncPP# .
(PP. /
orderPP/ 4
)PP4 5
;PP5 6
}QQ 
publicTT 

asyncTT 
TaskTT 
DeleteOrderAsyncTT &
(TT& '
GuidTT' +
orderIdTT, 3
)TT3 4
{UU 
OrderVV 
?VV 
orderVV 
=VV 
awaitVV  
_orderGenericServiceVV 1
.VV1 2
GetByIdAsyncVV2 >
(VV> ?
orderIdVV? F
)VVF G
??VVH J
throwVVK P
newVVQ T"
OrderNotFoundExceptionVVU k
(VVk l
orderIdVVl s
)VVs t
;VVt u
ifWW 

(WW 
orderWW 
.WW 
StatusWW 
!=WW 
OrderStatusWW '
.WW' (
PaidWW( ,
)WW, -
throwWW. 3
newWW4 7!
OrderNotPaidExceptionWW8 M
(WWM N
orderIdWWN U
)WWU V
;WWV W
awaitYY  
_orderGenericServiceYY "
.YY" #
DeleteAsyncYY# .
(YY. /
orderYY/ 4
)YY4 5
;YY5 6
}ZZ 
public\\ 

async\\ 
Task\\ 
<\\ 
IEnumerable\\ !
<\\! "
Order\\" '
>\\' (
>\\( )"
GetOrdersByStatusAsync\\* @
(\\@ A
OrderStatus\\A L
status\\M S
)\\S T
{]] 
return^^ 
await^^  
_orderGenericService^^ )
.__ "
FilterByExpressionLinq__ /
(__/ 0
order__0 5
=>__6 8
order__9 >
.__> ?
Status__? E
==__F H
status__I O
)__O P
.`` 
Include``  
(``  !
order``! &
=>``' )
order``* /
.``/ 0
Table``0 5
)``5 6
.aa 
Includeaa  
(aa  !
orderaa! &
=>aa' )
orderaa* /
.aa/ 0
ProductListaa0 ;
)aa; <
.bb 
ThenIncludebb $
(bb$ %
itembb% )
=>bb* ,
itembb- 1
.bb1 2
Productbb2 9
)bb9 :
.cc 
ToListAsynccc $
(cc$ %
)cc% &
;cc& '
}dd 
}ff ›
SY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Order\IOrderService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Order& +
;+ ,
public 
	interface 
IOrderService 
{ 
Task 
< 	
IEnumerable	 
< 
Order 
> 
> 
GetAllOrdersAsync .
(. /
)/ 0
;0 1
Task		 
<		 	
Order			 
>		 
CreateOrderAsync		  
(		  !
Order		! &
order		' ,
)		, -
;		- .
Task 
< 	
Order	 
> 
UpdateOrderAsync  
(  !
Order! &
order' ,
), -
;- .
Task 
< 	
Order	 
? 
> 
GetOrderByIdAsync "
(" #
Guid# '
orderId( /
)/ 0
;0 1
Task 
< 	
IEnumerable	 
< 
Order 
> 
> 
GetTableOrdersAsync 0
(0 1
Guid1 5
tableId6 =
)= >
;> ?
Task 
< 	
IEnumerable	 
< 
Order 
> 
> !
GetSessionOrdersAsync 2
(2 3
Guid3 7
tableSessionId8 F
)F G
;G H
Task "
UpdateOrderStatusAsync	 
(  
Guid  $
orderId% ,
,, -
OrderStatus. 9
	newStatus: C
)C D
;D E
Task 
DeleteOrderAsync	 
( 
Guid 
orderId &
)& '
;' (
Task 
< 	
IEnumerable	 
< 
Order 
> 
> "
GetOrdersByStatusAsync 3
(3 4
OrderStatus4 ?
status@ F
)F G
;G H
} “:
eY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Product\Implementation\ProductService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Product& -
.- .
Implementation. <
;< =
public 
class 
ProductService 
: 
IProductService -
{		 
private

 
readonly

 
IGenericService

 $
<

$ %
Product

% ,
>

, -"
_productGenericService

. D
;

D E
public 

ProductService 
( 
IGenericService )
<) *
Product* 1
>1 2!
productGenericService3 H
)H I
{ "
_productGenericService 
=  !
productGenericService! 6
;6 7
} 
public 

async 
Task 
< 
Product 
> 
CreateProductAsync 1
(1 2
Product2 9
product: A
)A B
{ 
await "
_productGenericService $
.$ %
InsertAsync% 0
(0 1
product1 8
)8 9
;9 :
return 
product 
; 
} 
public 

async 
Task 
< 
Product 
? 
> 
GetProductByIdAsync  3
(3 4
Guid4 8
	productId9 B
)B C
{ 
return 
await "
_productGenericService +
.+ ,
GetByIdAsync, 8
(8 9
	productId9 B
)B C
;C D
} 
public 

async 
Task 
< 
List 
< 
Product "
>" #
># $$
GetProductListByIdsAsync% =
(= >
IEnumerable> I
<I J
GuidJ N
>N O

productIdsP Z
)Z [
{ 
return 
await "
_productGenericService +
. "
FilterByExpressionLinq #
(# $
p$ %
=>& (

productIds) 3
.3 4
Contains4 <
(< =
p= >
.> ?
Id? A
)A B
)B C
. 
ToListAsync 
( 
) 
; 
} 
public   

async   
Task   
<   
IEnumerable   !
<  ! "
Product  " )
>  ) *
>  * +
GetAllProductsAsync  , ?
(  ? @
)  @ A
{!! 
return"" 
await"" "
_productGenericService"" +
.""+ ,
FindAllAsync"", 8
(""8 9
)""9 :
;"": ;
}## 
public%% 

async%% 
Task%% 
<%% 
IEnumerable%% !
<%%! "
Product%%" )
>%%) *
>%%* +%
GetProductsAvailableAsync%%, E
(%%E F
)%%F G
{&& 
return'' 
await'' "
_productGenericService'' +
.(( "
FilterByExpressionLinq(( #
(((# $
product(($ +
=>((, .
product((/ 6
.((6 7
IsAvailable((7 B
==((C E
true((F J
)((J K
.)) 
ToListAsync)) 
()) 
))) 
;)) 
}** 
public,, 

async,, 
Task,, 
<,, 
Product,, 
>,, 
UpdateProductAsync,, 1
(,,1 2
Product,,2 9
product,,: A
),,A B
{-- 
await.. "
_productGenericService.. $
...$ %
UpdateAsync..% 0
(..0 1
product..1 8
)..8 9
;..9 :
return// 
product// 
;// 
}00 
public22 

async22 
Task22 
DeleteProductAsync22 (
(22( )
Guid22) -
	productId22. 7
)227 8
{33 
Product44 
?44 
product44 
=44 
await44  "
_productGenericService44! 7
.447 8
GetByIdAsync448 D
(44D E
	productId44E N
)44N O
??44P R
throw44S X
new44Y \%
InvalidOperationException44] v
(44v w
$str	44w ã
)
44ã å
;
44å ç
await66 "
_productGenericService66 $
.66$ %
DeleteAsync66% 0
(660 1
product661 8
)668 9
;669 :
}77 
public99 

async99 
Task99 
<99 
bool99 
>99 #
IsProductAvailableAsync99 3
(993 4
Guid994 8
	productId999 B
)99B C
{:: 
return;; 
await;; "
_productGenericService;; +
.<< "
FilterByExpressionLinq<< #
(<<# $
product<<$ +
=><<, .
product<</ 6
.<<6 7
Id<<7 9
==<<: <
	productId<<= F
&&<<G I
product<<J Q
.<<Q R
IsAvailable<<R ]
)<<] ^
.== 
AnyAsync== 
(== 
)== 
;== 
}>> 
public@@ 

async@@ 
Task@@ 
<@@ 
IEnumerable@@ !
<@@! "
Product@@" )
>@@) *
>@@* +%
SearchProductsByWordAsync@@, E
(@@E F
string@@F L
keyword@@M T
)@@T U
{AA 
ifBB 

(BB 
stringBB 
.BB 
IsNullOrWhiteSpaceBB %
(BB% &
keywordBB& -
)BB- .
)BB. /
returnCC 
[CC 
]CC 
;CC 
returnEE 
awaitEE "
_productGenericServiceEE +
.FF "
FilterByExpressionLinqFF #
(FF# $
productFF$ +
=>FF, .
productFF/ 6
.FF6 7
NameFF7 ;
.FF; <
ToLowerFF< C
(FFC D
)FFD E
.FFE F
ContainsFFF N
(FFN O
keywordFFO V
.FFV W
ToLowerFFW ^
(FF^ _
)FF_ `
)FF` a
)FFa b
.GG 
ToListAsyncGG 
(GG 
)GG 
;GG 
}HH 
publicJJ 

asyncJJ 
TaskJJ '
SetProductAvailabilityAsyncJJ 1
(JJ1 2
GuidJJ2 6
	productIdJJ7 @
,JJ@ A
boolJJB F
isAvailableJJG R
)JJR S
{KK 
ProductLL 
?LL 
productLL 
=LL 
awaitLL  "
_productGenericServiceLL! 7
.LL7 8
GetByIdAsyncLL8 D
(LLD E
	productIdLLE N
)LLN O
??LLP R
throwLLS X
newLLY \%
InvalidOperationExceptionLL] v
(LLv w
$str	LLw ã
)
LLã å
;
LLå ç
productMM 
.MM 
IsAvailableMM 
=MM 
isAvailableMM )
;MM) *
awaitOO "
_productGenericServiceOO $
.OO$ %
UpdateAsyncOO% 0
(OO0 1
productOO1 8
)OO8 9
;OO9 :
}PP 
}RR ’
WY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Product\IProductService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Product& -
;- .
public 
	interface 
IProductService  
{ 
Task 
< 	
Product	 
> 
CreateProductAsync $
($ %
Product% ,
product- 4
)4 5
;5 6
Task 
< 	
Product	 
? 
> 
GetProductByIdAsync &
(& '
Guid' +
	productId, 5
)5 6
;6 7
Task

 
<

 	
List

	 
<

 
Product

 
>

 
>

 $
GetProductListByIdsAsync

 0
(

0 1
IEnumerable

1 <
<

< =
Guid

= A
>

A B

productIds

C M
)

M N
;

N O
Task 
< 	
IEnumerable	 
< 
Product 
> 
> 
GetAllProductsAsync 2
(2 3
)3 4
;4 5
Task 
< 	
IEnumerable	 
< 
Product 
> 
> %
GetProductsAvailableAsync 8
(8 9
)9 :
;: ;
Task 
< 	
Product	 
> 
UpdateProductAsync $
($ %
Product% ,
product- 4
)4 5
;5 6
Task 
DeleteProductAsync	 
( 
Guid  
	productId! *
)* +
;+ ,
Task 
< 	
bool	 
> #
IsProductAvailableAsync &
(& '
Guid' +
	productId, 5
)5 6
;6 7
Task 
< 	
IEnumerable	 
< 
Product 
> 
> %
SearchProductsByWordAsync 8
(8 9
string9 ?
keyword@ G
)G H
;H I
Task '
SetProductAvailabilityAsync	 $
($ %
Guid% )
	productId* 3
,3 4
bool5 9
isAvailable: E
)E F
;F G
} Ï.
oY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\TableSession\Implementation\TableSessionService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
TableSession& 2
.2 3
Implementation3 A
;A B
public		 
class		 
TableSessionService		  
:		! " 
ITableSessionService		# 7
{

 
private 
readonly 
IGenericService $
<$ %
TableSession% 1
>1 2"
_sessionGenericService3 I
;I J
public 

TableSessionService 
(  
IGenericService  /
</ 0
TableSession0 <
>< =
tableGenericService> Q
)Q R
{ "
_sessionGenericService 
=  
tableGenericService! 4
;4 5
} 
public 

async 
Task 
< 
TableSession "
?" #
># $
GetSessionByIdAsync% 8
(8 9
Guid9 =
	sessionId> G
)G H
{ 
return 
await "
_sessionGenericService +
.+ ,
GetByIdAsync, 8
(8 9
	sessionId9 B
)B C
;C D
} 
public 

async 
Task 
< 
TableSession "
?" #
># $*
GetActiveSessionByTableIdAsync% C
(C D
GuidD H
tableIdI P
)P Q
{ 
return 
await "
_sessionGenericService +
. "
FilterByExpressionLinq '
(' (
session( /
=>0 2
session3 :
.: ;
TableId; B
==C E
tableIdF M
&&N P
sessionQ X
.X Y
IsActiveY a
==b d
truee i
)i j
. 
Include 
( 
tableSession %
=>& (
tableSession) 5
.5 6
Table6 ;
); <
. 
FirstOrDefaultAsync $
($ %
)% &
;& '
} 
public 

async 
Task 
< 
TableSession "
>" #
StartSessionAsync$ 5
(5 6
TableSession6 B
tableSessionC O
)O P
{ 
await   "
_sessionGenericService   $
.  $ %
InsertAsync  % 0
(  0 1
tableSession  1 =
)  = >
;  > ?
return!! 
tableSession!! 
;!! 
}"" 
public## 

async## 
Task## 
CloseSessionAsync## '
(##' (
Guid##( ,
tableSessionId##- ;
)##; <
{$$ 
TableSession%% 
session%% 
=%% 
await%% $"
_sessionGenericService%%% ;
.%%; <
GetByIdAsync%%< H
(%%H I
tableSessionId%%I W
)%%W X
??%%Y [
throw%%\ a
new%%b e%
InvalidOperationException%%f 
(	%% Ä
$str
%%Ä ô
)
%%ô ö
;
%%ö õ
session&& 
.&& 
IsActive&& 
=&& 
false&&  
;&&  !
session'' 
.'' 
EndTime'' 
='' 
DateTime'' "
.''" #
UtcNow''# )
;'') *
await(( "
_sessionGenericService(( $
.(($ %
UpdateAsync((% 0
(((0 1
session((1 8
)((8 9
;((9 :
})) 
public** 

async** 
Task** 
<** 
bool** 
>** !
HasActiveSessionAsync** 1
(**1 2
Guid**2 6
tableId**7 >
)**> ?
{++ 
return,, 
await,, "
_sessionGenericService,, +
.-- "
FilterByExpressionLinq-- #
(--# $
session--$ +
=>--, .
session--/ 6
.--6 7
TableId--7 >
==--? A
tableId--B I
&&--J L
session--M T
.--T U
EndTime--U \
==--] _
null--` d
)--d e
... 
AnyAsync.. 
(.. 
).. 
;.. 
}// 
public11 

async11 
Task11 
<11 
IEnumerable11 !
<11! "
TableSession11" .
>11. /
>11/ 0%
GetSessionsByTableIdAsync111 J
(11J K
Guid11K O
tableId11P W
)11W X
{22 
return33 
await33 "
_sessionGenericService33 +
.44 "
FilterByExpressionLinq44 '
(44' (
session44( /
=>440 2
session443 :
.44: ;
TableId44; B
==44C E
tableId44F M
)44M N
.55 
OrderByDescending55 "
(55" #
session55# *
=>55+ -
session55. 5
.555 6
	CreatedAt556 ?
)55? @
.66 
ToListAsync66 
(66 
)66 
;66 
}77 
public99 

async99 
Task99 
<99 
IEnumerable99 !
<99! "
TableSession99" .
>99. /
>99/ 0%
GetAllActiveSessionsAsync991 J
(99J K
)99K L
{:: 
return;; 
await;; "
_sessionGenericService;; +
.<< "
FilterByExpressionLinq<< #
(<<# $
session<<$ +
=><<, .
session<</ 6
.<<6 7
EndTime<<7 >
==<<? A
null<<B F
)<<F G
.== 
ToListAsync== 
(== 
)== 
;== 
}>> 
}?? „
aY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\TableSession\ITableSessionService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
TableSession& 2
;2 3
public 
	interface  
ITableSessionService %
{ 
Task 
< 	
TableSession	 
? 
> 
GetSessionByIdAsync +
(+ ,
Guid, 0
	sessionId1 :
): ;
;; <
Task 
< 	
TableSession	 
? 
> *
GetActiveSessionByTableIdAsync 6
(6 7
Guid7 ;
tableId< C
)C D
;D E
Task 
< 	
TableSession	 
> 
StartSessionAsync (
(( )
TableSession) 5
tableSession6 B
)B C
;C D
Task		 
CloseSessionAsync			 
(		 
Guid		 
tableSessionId		  .
)		. /
;		/ 0
Task

 
<

 	
bool

	 
>

 !
HasActiveSessionAsync

 $
(

$ %
Guid

% )
tableId

* 1
)

1 2
;

2 3
Task 
< 	
IEnumerable	 
< 
TableSession !
>! "
>" #%
GetSessionsByTableIdAsync$ =
(= >
Guid> B
tableIdC J
)J K
;K L
Task 
< 	
IEnumerable	 
< 
TableSession !
>! "
>" #%
GetAllActiveSessionsAsync$ =
(= >
)> ?
;? @
} ⁄$
aY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Table\Implementation\TableService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Table& +
.+ ,
Implementation, :
;: ;
public 
class 
TableService 
: 
ITableService )
{ 
private		 
readonly		 
IGenericService		 $
<		$ %
Table		% *
>		* + 
_tableGenericService		, @
;		@ A
public

 

TableService

 
(

 
IGenericService

 '
<

' (
Table

( -
>

- .
tableGenericService

/ B
)

B C
{  
_tableGenericService 
= 
tableGenericService 2
;2 3
} 
public 

async 
Task 
< 
Table 
> 
CreateTableAsync -
(- .
Table. 3
table4 9
)9 :
{ 
await  
_tableGenericService "
." #
InsertAsync# .
(. /
table/ 4
)4 5
;5 6
return 
table 
; 
} 
public 

async 
Task 
< 
Table 
? 
> 
GetTableByIdAsync /
(/ 0
Guid0 4
tableId5 <
)< =
{ 
return 
await  
_tableGenericService )
.) *
GetByIdAsync* 6
(6 7
tableId7 >
)> ?
;? @
} 
public 

async 
Task 
< 
IEnumerable !
<! "
Table" '
>' (
>( )
GetAllTablesAsync* ;
(; <
)< =
{ 
return 
await  
_tableGenericService )
.) *
FindAllAsync* 6
(6 7
)7 8
;8 9
} 
public 

async 
Task 
< 
Table 
> 
UpdateTableAsync -
(- .
Table. 3
table4 9
)9 :
{ 
await  
_tableGenericService "
." #
UpdateAsync# .
(. /
table/ 4
)4 5
;5 6
return   
table   
;   
}!! 
public"" 

async"" 
Task"" 
DeleteTableAsync"" &
(""& '
Guid""' +
tableId"", 3
)""3 4
{## 
Table$$ 
table$$ 
=$$ 
await$$  
_tableGenericService$$ 0
.$$0 1
GetByIdAsync$$1 =
($$= >
tableId$$> E
)$$E F
??$$G I
throw$$J O
new$$P S%
InvalidOperationException$$T m
($$m n
$str	$$n Ç
)
$$Ç É
;
$$É Ñ
await&&  
_tableGenericService&& "
.&&" #
DeleteAsync&&# .
(&&. /
table&&/ 4
)&&4 5
;&&5 6
}'' 
public(( 

async(( 
Task(( 
<(( 
bool(( 
>(( !
IsTableAvailableAsync(( 1
(((1 2
Guid((2 6
tableId((7 >
)((> ?
{)) 
return** 
await**  
_tableGenericService** )
.++ "
FilterByExpressionLinq++ #
(++# $
table++$ )
=>++* ,
table++- 2
.++2 3

IsOccupied++3 =
==++> @
false++A F
)++F G
.,, 
AsNoTracking,, 
(,, 
),, 
.-- 
AnyAsync-- 
(-- 
)-- 
;-- 
}.. 
public00 

async00 
Task00 
<00 
IEnumerable00 !
<00! "
Table00" '
>00' (
>00( )#
GetAvailableTablesAsync00* A
(00A B
)00B C
{11 
return22 
await22  
_tableGenericService22 )
.33 "
FilterByExpressionLinq33 #
(33# $
table33$ )
=>33* ,
table33- 2
.332 3

IsOccupied333 =
==33> @
false33A F
)33F G
.44 
AsNoTracking44 
(44 
)44 
.55 
ToListAsync55 
(55 
)55 
;55 
}66 
}88 ∫
SY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\Table\ITableService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
Table& +
;+ ,
public 
	interface 
ITableService 
{ 
Task 
< 	
Table	 
> 
CreateTableAsync  
(  !
Table! &
table' ,
), -
;- .
Task 
< 	
Table	 
? 
> 
GetTableByIdAsync "
(" #
Guid# '
tableId( /
)/ 0
;0 1
Task

 
<

 	
IEnumerable

	 
<

 
Table

 
>

 
>

 
GetAllTablesAsync

 .
(

. /
)

/ 0
;

0 1
Task 
< 	
Table	 
> 
UpdateTableAsync  
(  !
Table! &
table' ,
), -
;- .
Task 
DeleteTableAsync	 
( 
Guid 
tableId &
)& '
;' (
Task 
< 	
bool	 
> !
IsTableAvailableAsync $
($ %
Guid% )
tableId* 1
)1 2
;2 3
Task 
< 	
IEnumerable	 
< 
Table 
> 
> #
GetAvailableTablesAsync 4
(4 5
)5 6
;6 7
} Ä
_Y:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\User\Implementation\UserService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
User& *
.* +
Implementation+ 9
;9 :
public 
class 
UserService 
: 
IUserService '
{		 
private

 
readonly

 
IGenericService

 $
<

$ %
User

% )
>

) *
_userGenericService

+ >
;

> ?
public 

UserService 
( 
IGenericService &
<& '
User' +
>+ ,
userGenericService- ?
)? @
{ 
_userGenericService 
= 
userGenericService 0
;0 1
} 
public 

async 
Task 
< 
bool 
> 
CreateUserAsync +
(+ ,
User, 0

userEntity1 ;
); <
{ 
try 
{ 	
await 
_userGenericService %
.% &
InsertAsync& 1
(1 2

userEntity2 <
)< =
;= >
return 
true 
; 
} 	
catch 
{ 	
return 
false 
; 
} 	
} 
public 

async 
Task 
< 
User 
? 
> 
GetUserByNameAsync /
(/ 0
string0 6
userName7 ?
)? @
{ 
return   
await   
_userGenericService   (
.  ( )"
FilterByExpressionLinq  ) ?
(  ? @
user  @ D
=>  E G
user  H L
.  L M
UserName  M U
==  V X
userName  Y a
)  a b
.  b c
FirstOrDefaultAsync  c v
(  v w
)  w x
;  x y
}!! 
public## 

async## 
Task## 
<## 
bool## 
>## &
CheckIfUsernameExistsAsync## 6
(##6 7
string##7 =
userName##> F
)##F G
{$$ 
return%% 
await%% 
_userGenericService%% (
.%%( )"
FilterByExpressionLinq%%) ?
(%%? @
user%%@ D
=>%%E G
user%%H L
.%%L M
UserName%%M U
==%%V X
userName%%Y a
)%%a b
.%%b c
AnyAsync%%c k
(%%k l
)%%l m
;%%m n
}&& 
public(( 

async(( 
Task(( 
<(( 
User(( 
?(( 
>(( 
GetUserByIdAsync(( -
(((- .
Guid((. 2
userId((3 9
)((9 :
{)) 
return** 
await** 
_userGenericService** (
.**( )
GetByIdAsync**) 5
(**5 6
userId**6 <
)**< =
;**= >
}++ 
public-- 

async-- 
Task-- 
<-- 
User-- 
>-- 
UpdateUserAsync-- +
(--+ ,
User--, 0
user--1 5
)--5 6
{.. 
await// 
_userGenericService// !
.//! "
UpdateAsync//" -
(//- .
user//. 2
)//2 3
;//3 4
return00 
user00 
;00 
}11 
}33 Î	
QY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Services\User\IUserService.cs
	namespace 	
Restaurant_Backend
 
. 
Services %
.% &
User& *
;* +
public 
	interface 
IUserService 
{		 
Task 
< 	
bool	 
> 
CreateUserAsync 
( 
User #

userEntity$ .
). /
;/ 0
Task 
< 	
User	 
? 
> 
GetUserByNameAsync "
(" #
string# )
userName* 2
)2 3
;3 4
Task 
< 	
User	 
? 
> 
GetUserByIdAsync  
(  !
Guid! %
userId& ,
), -
;- .
Task$$ 
<$$ 	
bool$$	 
>$$ &
CheckIfUsernameExistsAsync$$ )
($$) *
string$$* 0
userName$$1 9
)$$9 :
;$$: ;
Task++ 
<++ 	
User++	 
>++ 
UpdateUserAsync++ 
(++ 
User++ #
user++$ (
)++( )
;++) *
}-- å$
DY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Utils\Encrypt.cs
	namespace 	
Restaurant_Backend
 
. 
Utils "
;" #
public 
static 
class 
Encrypt 
{ 
public 

static 
string 
GenerateToken &
(& '
User' +
user, 0
)0 1
{ !
ArgumentNullException 
. 
ThrowIfNull )
() *
user* .
). /
;/ 0
byte 
[ 
] 
keyBytes 
= 
Encoding "
." #
UTF8# '
.' (
GetBytes( 0
(0 1
$str1 g
)g h
;h i
SigningCredentials 
signingCredentials -
=. /
new0 3
(3 4
new  
SymmetricSecurityKey $
($ %
keyBytes% -
)- .
,. /
SecurityAlgorithms0 B
.B C

HmacSha256C M
)M N
;N O
Claim 
[ 
] 
claims 
= 
[ 	
new 
Claim 
( #
JwtRegisteredClaimNames -
.- .
Name. 2
,2 3
user4 8
.8 9
UserName9 A
)A B
,B C
new   
Claim   
(   
$str   
,   
user    $
.  $ %
Id  % '
.  ' (
ToString  ( 0
(  0 1
)  1 2
)  2 3
,  3 4
new!! 
Claim!! 
(!! 

ClaimTypes!!  
.!!  !
Role!!! %
,!!% &
user!!' +
.!!+ ,
Role!!, 0
.!!0 1
ToString!!1 9
(!!9 :
)!!: ;
)!!; <
]"" 	
;""	 

JwtSecurityToken$$ 
securityToken$$ &
=$$' (
new$$) ,
($$, -
issuer%% 
:%% 
$str%% &
,%%& '
expires&& 
:&& 
DateTime&& 
.&& 
Now&& !
.&&! "
AddHours&&" *
(&&* +
$num&&+ ,
)&&, -
,&&- .
claims'' 
:'' 
claims'' 
,'' 
signingCredentials(( 
:(( 
signingCredentials((  2
)((2 3
;((3 4
return** 
new** #
JwtSecurityTokenHandler** *
(*** +
)**+ ,
.**, -

WriteToken**- 7
(**7 8
securityToken**8 E
)**E F
;**F G
}++ 
public22 

static22 
string22 
Hash22 
(22 
string22 $
value22% *
)22* +
{33 
StringBuilder44 
sb44 
=44 
new44 
(44 
)44  
;44  !
Encoding55 
enc55 
=55 
Encoding55 
.55  
UTF855  $
;55$ %
byte77 
[77 
]77 
result77 
=77 
SHA25677 
.77 
HashData77 '
(77' (
enc77( +
.77+ ,
GetBytes77, 4
(774 5
value775 :
)77: ;
)77; <
;77< =
foreach99 
(99 
byte99 
b99 
in99 
result99 !
)99! "
{:: 	
sb;; 
.;; 
Append;; 
(;; 
b;; 
.;; 
ToString;;  
(;;  !
$str;;! %
);;% &
);;& '
;;;' (
}<< 	
return>> 
sb>> 
.>> 
ToString>> 
(>> 
)>> 
;>> 
}?? 
publicGG 

staticGG 
boolGG 
	CheckHashGG  
(GG  !
stringGG! '
plainTextPasswordGG( 9
,GG9 :
stringGG; A
hashedPasswordGGB P
)GGP Q
{HH 
stringII 
hashedInputII 
=II 
HashII !
(II! "
plainTextPasswordII" 3
)II3 4
;II4 5
returnJJ 
stringJJ 
.JJ 
EqualsJJ 
(JJ 
hashedInputJJ (
,JJ( )
hashedPasswordJJ* 8
,JJ8 9
StringComparisonJJ: J
.JJJ K
OrdinalIgnoreCaseJJK \
)JJ\ ]
;JJ] ^
}KK 
}LL  	
QY:\PROGRAMACION\RestaurantSystem\Restaurant-Backend\Utils\RestaurantExceptions.cs
	namespace 	
Restaurant_Backend
 
. 
Utils "
;" #
public 
class  
RestaurantExceptions !
{ 
} 
public 
class "
OrderNotFoundException #
:$ %
	Exception& /
{ 
public		 
"
OrderNotFoundException		 !
(		! "
Guid		" &
orderId		' .
)		. /
:

 	
base


 
(

 
$"

 
$str

 
{

  
orderId

  '
}

' (
$str

( 7
"

7 8
)

8 9
{

: ;
}

< =
} 
public 
class !
OrderNotPaidException "
:# $
	Exception% .
{ 
public 
!
OrderNotPaidException  
(  !
Guid! %
orderId& -
)- .
: 	
base
 
( 
$" 
$str 4
{4 5
orderId5 <
}< =
$str= >
"> ?
)? @
{A B
}C D
} 