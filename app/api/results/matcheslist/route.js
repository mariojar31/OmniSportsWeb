import { NextResponse as res, NextRequest as req } from "next/server";
import { fetchApi } from "@/app/scripts/sc_utilities";

export async function POST(req){
    const request = await req.json();
    const type = request.type;

    try{
        const matchesList = await fetchApi();
        const matches = classifyMatches(matchesList,type);
        const response = res.json(matches);
  
        return response;

    }catch(error){
        console.error('Error en la solicitud:', error);

    }

    function classifyMatches(list, type){
        const output = list.reduce((acc, match) => {
          if (type === 'live') {
            if(match.OfficialityStatus === 0 && match.MatchStatus === 3){
              return [...acc, { match: match }];
            }
          } else if (type === 'fcol') {
            if(match.IdCompetition === '2000000080' || match.IdCompetition === 'byhmntnl1b4lxw0zz21im3zkd'|| match.IdCompetition === '9rmivkq3pf7cozc49amr4kl56'){
            return [...acc, { match: match }];
            }
          }else if (type === 'uefa') {
            if(match.IdCompetition === '2000001032' || match.IdCompetition === '2000001041' || match.IdCompetition === '2000001033' || match.IdCompetition === '2000000018' || match.IdCompetition === '2000000037' || match.IdCompetition === '2000000026' || match.IdCompetition === '7r2h6ebp0p3z4iq777mwrnzzd'|| match.IdCompetition === '482ofyysbdbeoxauk19yg7tdt'|| match.IdCompetition === '2000000041'|| match.IdCompetition === 'a0f4gtru0oyxmpvty4thc5qkc'|| match.IdCompetition === '2000000033'|| match.IdCompetition === '2000000014'|| match.IdCompetition === '2000000005'|| match.IdCompetition === 'c7b8o53flg36wbuevfzy3lb10'|| match.IdCompetition === '2000000019'|| match.IdCompetition === '68zplepppndhl8bfdvgy9vgu1'|| match.IdCompetition === '75434tz9rc14xkkvudex742ui'|| match.IdCompetition === '107'|| match.IdCompetition === '2000000022' || match.IdCompetition ==='3is4bkgf3loxv9qfg3hm8zfqb' || match.IdCompetition ==='5k620c7y6dlbmcm88dt3eb7t'){
            return [...acc, { match: match }];
            }         
          }else if (type === 'conmebol') {
            if(match.IdCompetition === '400125862' || match.IdCompetition === '2000001042'|| match.IdCompetition === '2000001035' || match.IdCompetition === '2000000128' || match.IdCompetition === 'b51dpxc3hxobmjwkqvcm1nv14a'|| match.IdCompetition === '1cdi9vmb33ihlj8ymldgl6579' || match.IdCompetition === '1eimd27tu748g3q46i0qapem3' || match.IdCompetition ==='a81lq2nnsh2h11qr4z5cpieei' || match.IdCompetition === '2000000078' || match.IdCompetition === 'bbv6g4u3j4twckxxek668ty7e'|| match.IdCompetition === 'd4waxt6jbfrbzwcae203m7mqx' || match.IdCompetition ==='2000000069' || match.IdCompetition ==='15zkv6hogbst636ufjhajxcy' || match.IdCompetition ==='e0oz461icp8c5qvuy2nf3juy2'|| match.IdCompetition ==='2000000084'|| match.IdCompetition ==='2000000071' || match.IdCompetition ==='2000000076' || match.IdCompetition ==='b1g4t4yfhi1b0ffs6jncpgtii' || match.IdCompetition ==='2000000079'){
            return [...acc, { match: match }];
            }
          }else if (type === 'concacaf') {
            if(match.IdCompetition === '400132627' || match.IdCompetition === '2000001034' || match.IdCompetition === '2000000104' || match.IdCompetition === 'cjm9ktxwixs7q14un70lllgq1'|| match.IdCompetition === 'aoptcrsdi34eue1fnlk38ivo5'|| match.IdCompetition === '1rlh9j70dy0rmqwm89v2jmzg6' || match.IdCompetition === '2000000103'){
            return [...acc, { match: match }];
            }
          }else if (type === 'otros'){
            if(!(match.IdCompetition === '2000000080' || match.IdCompetition === 'byhmntnl1b4lxw0zz21im3zkd'|| match.IdCompetition === '9rmivkq3pf7cozc49amr4kl56' || match.IdCompetition === '2000001032' || match.IdCompetition === '2000001041' || match.IdCompetition === '2000001033' || match.IdCompetition === '2000000018' || match.IdCompetition === '2000000037' || match.IdCompetition === '2000000026' || match.IdCompetition === '7r2h6ebp0p3z4iq777mwrnzzd'|| match.IdCompetition === '482ofyysbdbeoxauk19yg7tdt'|| match.IdCompetition === '2000000041'|| match.IdCompetition === 'a0f4gtru0oyxmpvty4thc5qkc'|| match.IdCompetition === '2000000033'|| match.IdCompetition === '2000000014'|| match.IdCompetition === '2000000005'|| match.IdCompetition === 'c7b8o53flg36wbuevfzy3lb10'|| match.IdCompetition === '2000000019'|| match.IdCompetition === '68zplepppndhl8bfdvgy9vgu1'|| match.IdCompetition === '75434tz9rc14xkkvudex742ui'|| match.IdCompetition === '107'|| match.IdCompetition === '2000000022' || match.IdCompetition === '400125862' || match.IdCompetition === '2000001042'|| match.IdCompetition === '2000001035' || match.IdCompetition === '2000000128' || match.IdCompetition === 'b51dpxc3hxobmjwkqvcm1nv14a'|| match.IdCompetition === '1cdi9vmb33ihlj8ymldgl6579' || match.IdCompetition === '1eimd27tu748g3q46i0qapem3' || match.IdCompetition ==='a81lq2nnsh2h11qr4z5cpieei' || match.IdCompetition === '2000000078' || match.IdCompetition === 'bbv6g4u3j4twckxxek668ty7e'|| match.IdCompetition === 'd4waxt6jbfrbzwcae203m7mqx' || match.IdCompetition ==='2000000069' || match.IdCompetition ==='15zkv6hogbst636ufjhajxcy' || match.IdCompetition ==='e0oz461icp8c5qvuy2nf3juy2'|| match.IdCompetition ==='2000000084'|| match.IdCompetition ==='2000000071' || match.IdCompetition ==='2000000076' || match.IdCompetition ==='b1g4t4yfhi1b0ffs6jncpgtii' || match.IdCompetition ==='2000000079' || match.IdCompetition === '400132627' || match.IdCompetition === '2000001034' || match.IdCompetition === '2000000104' || match.IdCompetition === 'cjm9ktxwixs7q14un70lllgq1'|| match.IdCompetition === 'aoptcrsdi34eue1fnlk38ivo5'|| match.IdCompetition === '1rlh9j70dy0rmqwm89v2jmzg6' || match.IdCompetition === '2000000103'|| match.IdCompetition ==='3is4bkgf3loxv9qfg3hm8zfqb' || match.IdCompetition ==='5k620c7y6dlbmcm88dt3eb7t')){
              return [...acc, { match: match }];
              }
          }
  
          return acc;
        }, []);
        return output;
      };


}
